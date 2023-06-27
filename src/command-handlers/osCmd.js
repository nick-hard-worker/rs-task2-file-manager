import os from 'node:os';
import path from 'node:path';

const getFromOs = {
  EOL: os.EOL,
  cpus: ['Amount of CPUS: ' + os.availableParallelism()]
    .concat(os.cpus().map(({ model, speed }) => {
      return { model, speed: (speed / 1024).toFixed(2) + 'GHz' };
    })),
  homedir: path.resolve(os.homedir()),
  username: os.userInfo().username,
  architecture: os.arch()
};

export const osInfo = (cmd) => {
  const result = getFromOs[cmd.arg1];
  if (!result) throw new Error('not such OS argument');

  console.log(result);
};

