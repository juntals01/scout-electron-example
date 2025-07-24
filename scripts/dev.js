import chalk from 'chalk';
import { exec } from 'child_process';
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

const command = `concurrently -k -n "VITE,WAIT+ELECTRON" -c "cyan,magenta" "yarn dev:react" "wait-on ${viteUrl} && yarn dev:electron"`;

console.log(chalk.yellow('⏳ Running: ') + chalk.gray(command) + '\n');

const child = exec(command, { stdio: 'inherit', shell: true });

child.stdout?.pipe(process.stdout);
child.stderr?.pipe(process.stderr);
