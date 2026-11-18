import { buildSync } from 'esbuild';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testFile = path.join(__dirname, 'test-booking-flow.mjs');

console.log('Bundling test suite with esbuild...');
const result = buildSync({
  entryPoints: [testFile],
  bundle: true,
  platform: 'node',
  format: 'esm',
  write: false,
});

if (result.errors && result.errors.length > 0) {
  console.error('Failed to bundle tests:', result.errors);
  process.exit(1);
}

const bundledCode = result.outputFiles[0].text;
const run = spawnSync(process.execPath, ['--input-type=module', '-e', bundledCode], {
  stdio: 'inherit',
});

process.exit(run.status ?? 0);
