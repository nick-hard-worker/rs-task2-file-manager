import os from 'node:os';
import path from 'node:path';
import * as readline from 'node:readline/promises';
import * as cliOutput from './utils/cliOutput.js';
import { parseArgs, parseCmd } from './utils/parser.js';
import { osInfo } from './command-handlers/osCmd.js';
import { calculateHash } from './command-handlers/calcHash.js';


let currentFolder;
const args = parseArgs();
const userName = args.username || 'Anonymous';
cliOutput.greeting(userName);

currentFolder = path.resolve(os.homedir());
console.log(`You are currently in ${currentFolder}`);

// const rlOps = { input: process.stdin, output: process.stdout };
const rl = readline.createInterface(process.stdin);

// const answer = await rl.question('What do you think of Node.js? ');
// console.log(`Thank you for your valuable feedback: ${answer}`);

rl.on('line', async (input) => {
  const cmd = parseCmd(input);
  console.log('Received: ', cmd);
  if (cmd.command === 'os') console.log(osInfo(cmd));
  if (cmd.command === 'hash') {
    const filePath = path.resolve(cmd.arg1);
    const hash = await calculateHash(filePath);
    console.log(hash);
  }
});
// rl.close();

// console.dir(os.homedir(), os.userInfo());
// console.dir(os.userInfo());
