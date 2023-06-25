import path from 'node:path';
import * as fs from 'node:fs/promises';

const getAbsolutePath = (currentFolder, targetPath) => {
  if (path.isAbsolute(targetPath)) return path.resolve(targetPath);
  return path.resolve(currentFolder, targetPath);
};

async function isExist(path) {
  return await fs.access(path)
    .then(() => true)
    .catch(() => false);
};

export { getAbsolutePath, isExist };