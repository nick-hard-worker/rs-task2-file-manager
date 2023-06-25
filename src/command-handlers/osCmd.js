import os from 'node:os';
import path from 'node:path';

const getFromOs = {
  EOL: os.EOL,
  cpus: os.cpus().map(({ model, speed }) => { return { model, speed }; }),
  homedir: path.resolve(os.homedir()),
  username: os.userInfo().username,
  architecture: os.arch()
};

export const osInfo = (cmd) => {
  const result = getFromOs[cmd.arg1];
  if (!result) throw new Error('not such OS argument');

  console.log(result);
};

