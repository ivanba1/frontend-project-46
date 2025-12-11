import fs from 'fs';
import path from 'path';

const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);

  const fileContent = fs.readFileSync(absolutePath, 'utf-8');

  const fileExtension = path.extname(filepath); 

  switch (fileExtension) {
    case '.json':
      return JSON.parse(fileContent);

    default:
      throw new Error(`Unknown file format: ${fileExtension}`);
  }
};

export default parseFile;