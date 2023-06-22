import os from 'node:os';
import path from 'node:path';
import * as readline from 'node:readline/promises';

import * as cliOutput from './utils/cliOutput.js';
import { parseArgs, parseCmd } from './utils/parser.js';
import { getAbsolutePath } from './utils/get-absolute-path.js';

import { osInfo } from './command-handlers/osCmd.js';
import { calculateHash } from './command-handlers/calcHash.js';


let currentFolder;
const args = parseArgs();
const userName = args.username || 'Anonymous';
cliOutput.greeting(userName);

currentFolder = path.resolve(os.homedir());
cliOutput.currentPath(currentFolder);

const rl = readline.createInterface(process.stdin);

rl.on('line', async (input) => {
  const cmd = parseCmd(input);
  // console.log('Received: ', cmd);
  if (cmd.command === 'os') console.log(osInfo(cmd));
  if (cmd.command === 'hash') {
    const filePath = getAbsolutePath(currentFolder, cmd.arg1);
    const hash = await calculateHash(filePath);
    console.log(hash);
  }

  cliOutput.currentPath(currentFolder);
});
// rl.close();
