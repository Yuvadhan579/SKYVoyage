# SkyVoyage SQLite Backend

The frontend now uses a local Node.js API backed by SQLite for account registration/login, sessions, booking storage, booking history, and cancellations.

## Requirements
- Node.js 22.5+ (uses the built-in `node:sqlite` module)
- npm

## Run locally

Install frontend dependencies once with `npm install`.

Terminal 1 — start the SQLite API:

```bash
npm run server
```

Terminal 2 — start the React/Vite frontend:

```bash
npm run dev
```

Open `http://localhost:5173`. The API runs at `http://localhost:4000` and creates `server/skyvoyage.sqlite` automatically on first startup.

## Main API routes

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | API/database health check |
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Sign in |
| POST | `/api/auth/demo` | Create/sign in to the demo account |
| GET | `/api/auth/me` | Validate the current session |
| POST | `/api/auth/logout` | End the current session |
| GET | `/api/bookings` | List the signed-in user's bookings |
| POST | `/api/bookings` | Save a booking |
| PATCH | `/api/bookings/:pnr` | Cancel a booking |

All booking routes require `Authorization: Bearer <token>`. Passwords are salted and hashed with Node's `scrypt`; plaintext passwords are not stored. Booking details are stored as JSON in SQLite, associated with the account that created them.

## Notes
- This is a local academic/demo backend. The payment step remains a demonstration flow; it does not process real payments.
- For production deployment, use HTTPS, configure a strict `CLIENT_ORIGIN`, add rate limiting and password reset flows, and store the SQLite database on persistent storage. SQLite is intended for a single-server deployment; use a managed database for horizontally scaled hosting.
