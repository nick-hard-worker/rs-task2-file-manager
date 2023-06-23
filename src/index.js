import os from 'node:os';
import path from 'node:path';
import * as readline from 'node:readline/promises';

import * as cliOutput from './utils/cliOutput.js';
import { parseArgs, parseCmd } from './utils/parser.js';
import { getAbsolutePath } from './utils/get-absolute-path.js';

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
  try {
    const cmd = parseCmd(input);
    // console.log('Received: ', cmd);
    if (cmd.command === 'os') console.log(osInfo(cmd));
    if (cmd.command === 'hash') {
      const filePath = getAbsolutePath(currentFolder, cmd.arg1);
      const hash = await calculateHash(filePath);
      console.log(hash);
    }

    if (cmd.command === 'compress' || cmd.command === 'decompress') {
      const sourcePath = getAbsolutePath(currentFolder, cmd.arg1);
      const targetPath = getAbsolutePath(currentFolder, cmd.arg2);

      await archive(cmd.command, sourcePath, targetPath);
    }

    if (navCommandsList.includes(cmd.command)) {
      currentFolder = await navigate(cmd.command, currentFolder, cmd.arg1);
    };

    if (fsActionList.includes(cmd.command)) {
      const sourcePath = getAbsolutePath(currentFolder, cmd.arg1 || '');
      const targetPath = getAbsolutePath(currentFolder, cmd.arg2 || '');

      await fsAction(cmd.command, sourcePath, targetPath);
    };

    cliOutput.currentPath(currentFolder);
  }
  catch (err) {
    cliOutput.invalidInput();
    cliOutput.currentPath(currentFolder);
  }
});

// rl.close();
