import http from 'node:http';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new DatabaseSync(path.join(__dirname, 'skyvoyage.sqlite'));
db.exec(`
  PRAGMA foreign_keys = ON;
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL, salt TEXT NOT NULL,
    frequent_flyer_tier TEXT NOT NULL DEFAULT 'Member', miles INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS bookings (
    pnr TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status TEXT NOT NULL, booking_json TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const readBody = (req) => new Promise((resolve, reject) => {
  let raw = ''; req.on('data', chunk => { raw += chunk; if (raw.length > 2_000_000) reject(new Error('Request too large')); });
  req.on('end', () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch { reject(new Error('Invalid JSON')); } });
});
const publicUser = row => ({ id: row.id, name: row.name, email: row.email, frequentFlyerTier: row.frequent_flyer_tier, miles: row.miles });
const issueSession = userId => { const token = randomBytes(32).toString('hex'); db.prepare('INSERT INTO sessions(token,user_id) VALUES(?,?)').run(token, userId); return token; };
const getUser = req => {
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return null;
  return db.prepare('SELECT u.* FROM users u JOIN sessions s ON s.user_id=u.id WHERE s.token=?').get(token) || null;
};
const makePassword = password => { const salt = randomBytes(16).toString('hex'); return { salt, hash: scryptSync(password, salt, 64).toString('hex') }; };
const validPassword = (password, row) => {
  const actual = scryptSync(password, row.salt, 64); const expected = Buffer.from(row.password_hash, 'hex');
  return actual.length === expected.length && timingSafeEqual(actual, expected);
};

const server = http.createServer(async (req, res) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': req.headers.origin || process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json; charset=utf-8'
  };
  const send = (res, status, data) => { res.writeHead(status, corsHeaders); res.end(JSON.stringify(data)); };
  if (req.method === 'OPTIONS') { res.writeHead(204, corsHeaders); return res.end(); }
  const url = new URL(req.url, 'http://localhost');
  try {
    if (req.method === 'GET' && url.pathname === '/api/health') return send(res, 200, { ok: true, database: 'SQLite' });
    if (req.method === 'POST' && ['/api/auth/register', '/api/auth/login'].includes(url.pathname)) {
      const body = await readBody(req); const email = String(body.email || '').trim().toLowerCase(); const password = String(body.password || '');
      if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 6) return send(res, 400, { error: 'Enter a valid email and a password with at least 6 characters.' });
      let user;
      if (url.pathname.endsWith('register')) {
        if (!String(body.name || '').trim()) return send(res, 400, { error: 'Full name is required.' });
        const credentials = makePassword(password);
        try {
          const id = `usr-${randomBytes(8).toString('hex')}`;
          db.prepare('INSERT INTO users(id,name,email,password_hash,salt) VALUES(?,?,?,?,?)').run(id, String(body.name).trim(), email, credentials.hash, credentials.salt);
          user = db.prepare('SELECT * FROM users WHERE id=?').get(id);
        } catch (error) { if (String(error).includes('UNIQUE')) return send(res, 409, { error: 'An account with this email already exists.' }); throw error; }
      } else {
        user = db.prepare('SELECT * FROM users WHERE email=?').get(email);
        if (!user || !validPassword(password, user)) return send(res, 401, { error: 'Incorrect email or password.' });
      }
      return send(res, 200, { user: publicUser(user), token: issueSession(user.id) });
    }
    if (req.method === 'POST' && url.pathname === '/api/auth/demo') {
      let user = db.prepare('SELECT * FROM users WHERE email=?').get('julian.mercer@skyvoyage.internal');
      if (!user) {
        const credentials = makePassword(randomBytes(24).toString('hex'));
        const id = 'usr-demo-77';
        db.prepare(`INSERT INTO users(id,name,email,password_hash,salt,frequent_flyer_tier,miles) VALUES(?,?,?,?,?,'Platinum',125400)`).run(id, 'Capt. Julian Mercer', 'julian.mercer@skyvoyage.internal', credentials.hash, credentials.salt);
        user = db.prepare('SELECT * FROM users WHERE id=?').get(id);
      }
      return send(res, 200, { user: publicUser(user), token: issueSession(user.id) });
    }
    if (req.method === 'GET' && url.pathname === '/api/auth/me') {
      const user = getUser(req); return user ? send(res, 200, { user: publicUser(user) }) : send(res, 401, { error: 'Not authenticated.' });
    }
    if (req.method === 'POST' && url.pathname === '/api/auth/logout') {
      const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
      if (token) db.prepare('DELETE FROM sessions WHERE token=?').run(token);
      return send(res, 200, { ok: true });
    }
    if (url.pathname.startsWith('/api/bookings')) {
      const user = getUser(req); if (!user) return send(res, 401, { error: 'Please sign in to manage bookings.' });
      if (req.method === 'GET' && url.pathname === '/api/bookings') {
        const rows = db.prepare('SELECT booking_json FROM bookings WHERE user_id=? ORDER BY created_at DESC').all(user.id);
        return send(res, 200, { bookings: rows.map(row => JSON.parse(row.booking_json)) });
      }
      if (req.method === 'POST' && url.pathname === '/api/bookings') {
        const body = await readBody(req); const booking = body.booking;
        if (!booking?.pnr || !booking?.flight || !Array.isArray(booking.passengers)) return send(res, 400, { error: 'Booking details are incomplete.' });
        try { db.prepare('INSERT INTO bookings(pnr,user_id,status,booking_json) VALUES(?,?,?,?)').run(booking.pnr, user.id, booking.status || 'Confirmed', JSON.stringify(booking)); }
        catch (error) { if (String(error).includes('UNIQUE')) return send(res, 409, { error: 'This booking reference already exists.' }); throw error; }
        return send(res, 201, { booking });
      }
      const cancelMatch = url.pathname.match(/^\/api\/bookings\/([^/]+)$/);
      if (req.method === 'PATCH' && cancelMatch) {
        const row = db.prepare('SELECT booking_json FROM bookings WHERE pnr=? AND user_id=?').get(decodeURIComponent(cancelMatch[1]), user.id);
        if (!row) return send(res, 404, { error: 'Booking not found.' });
        const booking = { ...JSON.parse(row.booking_json), status: 'Cancelled' };
        db.prepare("UPDATE bookings SET status='Cancelled', booking_json=? WHERE pnr=? AND user_id=?").run(JSON.stringify(booking), booking.pnr, user.id);
        return send(res, 200, { booking });
      }
    }
    return send(res, 404, { error: 'Route not found.' });
  } catch (error) {
    console.error(error); return send(res, 500, { error: error.message || 'Internal server error.' });
  }
});
const port = Number(process.env.API_PORT || 4000);
server.listen(port, () => console.log(`SkyVoyage API running at http://localhost:${port}`));
