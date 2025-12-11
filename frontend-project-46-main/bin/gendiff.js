#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version        output the version number')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>', 'path to first file') 
  .argument('<filepath2>', 'path to second file') 
  .action((filepath1, filepath2, options) => {
    try {
      const diff = genDiff(filepath1, filepath2, options.format);
      console.log(diff);
    } catch (err) {
      console.error(`Error: ${err.message}`);
      process.exit(1); 
    }
  })

program.parse(process.argv);