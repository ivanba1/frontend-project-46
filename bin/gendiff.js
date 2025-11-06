import { Command } from 'commander';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packagePath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));

const program = new Command();

program
  .name('gendiff')
  .description(packageJson.description)
  .version(packageJson.version, '-V, --version')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    console.log(`Comparing file 1: ${filepath1}`);
    console.log(`Comparing file 2: ${filepath2}`);
    console.log(`Output format: ${options.format}`);
  });

program.parse(process.argv);