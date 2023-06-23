import * as fs from 'node:fs/promises';
import { constants as fsConstants, createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';

const streamingCopy = async (pathToFile, pathNewDirectory) => {
  const destinationFilePath = path.resolve(pathNewDirectory, path.basename(pathToFile));
  const rs = createReadStream(pathToFile);
  const ws = createWriteStream(destinationFilePath, { flags: 'wx' });
  await pipeline(rs, ws);
};

class FileCommands {
  constructor(filePath, destinationPath) {
    this.filePath = filePath;
    this.destinationPath = destinationPath;
  }
  async cat() {
    const contentFile = await fs.readFile(this.filePath, { encoding: 'utf8' }); // default trow error
    console.log(contentFile);
  }
  async add() { await fs.writeFile(this.filePath, '', { flag: 'wx' }); } // wx - throw error if exist
  async rn() { await fs.rename(this.filePath, this.destinationPath); }
  async cp() { await streamingCopy(this.filePath, this.destinationPath); }
  async mv() {
    await streamingCopy(this.filePath, this.destinationPath);
    await this.rm();
  }
  async rm() { await fs.rm(this.filePath); }
};

const fsActionList = Object
  .getOwnPropertyNames(FileCommands.prototype)
  .filter(propertyName => propertyName !== 'constructor');

const fsAction = async (cmd, filePath, destinationPath) => {
  const fsCommands = new FileCommands(filePath, destinationPath);
  return fsCommands[cmd]();
};

export { fsAction, fsActionList };