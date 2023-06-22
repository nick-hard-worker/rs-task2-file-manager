import path from 'node:path';

export const getAbsolutePath = (currentFolder, targetPath) => {
  if (path.isAbsolute(targetPath)) return path.resolve(targetPath);
  return path.resolve(currentFolder, targetPath);
};