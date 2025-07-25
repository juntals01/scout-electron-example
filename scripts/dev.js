import chalk from 'chalk';
import { spawn } from 'child_process';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const viteUrl = process.env.VITE_URL;

console.log(chalk.blue.bold('\n🔧  Starting development environment...\n'));

if (!viteUrl) {
  console.error(
    chalk.bgRed.white(' ERROR ') +
      chalk.red(' VITE_URL is not defined in .env.local\n')
  );
  process.exit(1);
}

console.log(
  chalk.green('✔ Loaded VITE_URL from .env.local: ') +
    chalk.cyanBright(viteUrl) +
    '\n'
);

// Define command
const command = `cross-env ELECTRON_IS_DEV=true concurrently -k -n "VITE,WAIT+ELECTRON" -c "cyan,magenta" "yarn dev:react" "wait-on ${viteUrl} && yarn dev:electron"`;

console.log(chalk.yellow('⏳ Running: ') + chalk.gray(command) + '\n');

const child = spawn(command, {
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code) => {
  console.log(
    code === 0
      ? chalk.green('\n✔ Dev environment exited cleanly.\n')
      : chalk.red(`\n✖ Dev environment exited with code ${code}\n`)
  );
  process.exit(code ?? 1);
});
