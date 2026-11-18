import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const serverScript = path.join(rootDir, 'server', 'index.js');
const viteBin = path.join(rootDir, 'node_modules', 'vite', 'bin', 'vite.js');

const shouldOpen = !process.argv.includes('--no-open');

console.log('\x1b[36m%s\x1b[0m', '============================================================');
console.log('\x1b[36m%s\x1b[0m', '  ✈️   SkyVoyage - Complete Flight Booking Application');
console.log('\x1b[36m%s\x1b[0m', '============================================================');
console.log('  Starting SQLite API (Backend) and React Dev Server (Frontend)...');
console.log('');

let backendProcess = null;
let frontendProcess = null;
let isShuttingDown = false;

function cleanup() {
  if (isShuttingDown) return;
  isShuttingDown = true;
  console.log('\n\x1b[33m[SkyVoyage] Stopping all servers...\x1b[0m');

  if (backendProcess && !backendProcess.killed) {
    try {
      if (process.platform === 'win32') {
        spawn('taskkill', ['/pid', String(backendProcess.pid), '/f', '/t'], { stdio: 'ignore' });
      } else {
        backendProcess.kill('SIGTERM');
      }
    } catch (_) {}
  }

  if (frontendProcess && !frontendProcess.killed) {
    try {
      if (process.platform === 'win32') {
        spawn('taskkill', ['/pid', String(frontendProcess.pid), '/f', '/t'], { stdio: 'ignore' });
      } else {
        frontendProcess.kill('SIGTERM');
      }
    } catch (_) {}
  }

  setTimeout(() => process.exit(0), 400);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);

// 1. Start Backend API
console.log('\x1b[34m[Backend]\x1b[0m Starting SQLite API on port 4000...');
backendProcess = spawn(process.execPath, [serverScript], {
  cwd: rootDir,
  stdio: 'inherit',
  env: { ...process.env, CLIENT_ORIGIN: 'http://localhost:5173' }
});

backendProcess.on('error', (err) => {
  console.error('\x1b[31m[Backend Error]\x1b[0m Failed to start backend:', err.message);
  cleanup();
});

backendProcess.on('exit', (code) => {
  if (!isShuttingDown && code !== 0) {
    console.error(`\x1b[31m[Backend]\x1b[0m Server exited with code ${code}`);
  }
});

// 2. Start Frontend Dev Server after a brief delay
setTimeout(() => {
  console.log('\x1b[32m[Frontend]\x1b[0m Starting Vite dev server on port 5173...\n');

  const viteArgs = [viteBin];
  if (shouldOpen) {
    viteArgs.push('--open');
  }

  frontendProcess = spawn(process.execPath, viteArgs, {
    cwd: rootDir,
    stdio: 'inherit',
    env: process.env
  });

  frontendProcess.on('error', (err) => {
    console.error('\x1b[31m[Frontend Error]\x1b[0m Failed to start Vite:', err.message);
    cleanup();
  });

  frontendProcess.on('exit', (code) => {
    if (!isShuttingDown) {
      cleanup();
    }
  });
}, 600);
