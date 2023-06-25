import { getAbsolutePath } from './fs-helpers.js';

const parseArgs = () => {
  const args = process.argv.slice(2);

  const orderedArgs = {};
  for (let i = 0; i < args.length; i++) {
    const delimiterIndex = args[i].indexOf('=');
    const key = args[i].substring(2, delimiterIndex);
    const value = args[i].substring(delimiterIndex + 1);
    orderedArgs[key] = value;
    // console.log(`${key} is ${value}`);
  }
  return orderedArgs;
};

const parseCmd = (line, currentFolder) => {
  const arrFromLine = line.split(' ');
  const cmd = {
    command: arrFromLine[0],
    arg1: arrFromLine[1]?.replace(/^--/, ''),
    arg2: arrFromLine[2]
  };

  if (cmd.command !== 'os') {
    cmd.arg1 = getAbsolutePath(currentFolder, cmd.arg1 || '');
    cmd.arg2 = getAbsolutePath(currentFolder, cmd.arg2 || '');
  }

  return cmd;
};

export { parseArgs, parseCmd };