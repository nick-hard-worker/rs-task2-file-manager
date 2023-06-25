import os from 'node:os';
import path from 'node:path';
import * as readline from 'node:readline/promises';

import * as cliOutput from './utils/cliOutput.js';
import { parseArgs, parseCmd } from './utils/parser.js';

import { osInfo } from './command-handlers/osCmd.js';
import { calculateHash } from './command-handlers/calcHash.js';
import { archive } from './command-handlers/archive.js';
import { navigate, navCommandsList } from './command-handlers/fs-navigate.js';
import { fsAction, fsActionList } from './command-handlers/fs-action.js';

const args = parseArgs();
const userName = args.username || 'Anonymous';
cliOutput.greeting(userName);

let currentFolder = path.resolve(os.homedir());
cliOutput.currentPath(currentFolder);

const rlOps = { input: process.stdin, output: process.stdout };
const rl = readline.createInterface(rlOps);

rl.on('line', async (input) => {
  if (input === '.exit') closeApp();

  try {
    const cmd = parseCmd(input, currentFolder);
    if (cmd.command === 'os') {
      osInfo(cmd);
      return;
    };

    if (cmd.command === 'hash') {
      const hash = await calculateHash(filePath);
      console.log(hash);
      return;
    }

    if (['compress', 'decompress'].includes(cmd.command)) {
      await archive(cmd.command, sourcePath, targetPath);
      return;
    }

    if (navCommandsList.includes(cmd.command)) {
      currentFolder = await navigate(cmd.command, currentFolder, cmd.arg1);
      return;
    };

    if (fsActionList.includes(cmd.command)) {
      await fsAction(cmd.command, cmd.arg1, cmd.arg2);
      return;
    };

    throw new Error('No such command');
  }
  catch (err) {
    cliOutput.invalidInput();
  }
  finally {
    cliOutput.currentPath(currentFolder);
  }
});

rl.on("SIGINT", () => closeApp()); // press CTRL+C

function closeApp() {
  cliOutput.sayBye(userName);
  rl.close();
  process.exit(0);
};
