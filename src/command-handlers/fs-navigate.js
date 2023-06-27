import * as fs from 'node:fs/promises';
import path from 'node:path';

import { getAbsolutePath } from '../utils/fs-helpers.js';

const printList = async (folderPath) => {
  const files = await fs.readdir(folderPath, { withFileTypes: true });
  const list = files
    .filter(item => { return item.isFile() || item.isDirectory(); })
    .map(item => ({
      Name: item.name,
      Type: item.isDirectory() ? 'directory' : 'file'
    }))
    .sort((a, b) => {
      if (a.Type === b.Type) return a.Name.localeCompare(b.Name);
      return a.Type.localeCompare(b.Type);
    });

  console.table(list);
};

class NavigateCommands {
  constructor(currentFolder, destinationFolder) {
    this.currentFolder = currentFolder;
    this.destinationFolder = destinationFolder;
  }
  async ls() {
    await printList(this.currentFolder);
    return this.currentFolder;
  }
  up() { return path.resolve(this.currentFolder, '..'); }
  async cd() {
    const newFolder = getAbsolutePath(this.currentFolder, this.destinationFolder);
    const stats = await fs.stat(newFolder); // throw error if not exist
    if (stats.isDirectory()) return newFolder;

    throw new Error('incorrect folder'); // exist file instead folder
  }

  static getCommandsList() {
    return Object
      .getOwnPropertyNames(this.prototype)
      .filter(propertyName => propertyName !== 'constructor');
  }
}

const navigate = async (cmd, currentFolder, destinationFolder) => {
  const navCommands = new NavigateCommands(currentFolder, destinationFolder);
  return navCommands[cmd]();
};

const navCommandsList = NavigateCommands.getCommandsList();

export { navigate, navCommandsList };