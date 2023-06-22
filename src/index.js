import os from 'node:os';
import path from 'node:path';
import * as readline from 'node:readline/promises';
import * as cliOutput from './utils/cliOutput.js';
import { parseArgs, parseCmd } from './utils/parser.js';


let userName;
let currentFolder;
const args = parseArgs();
if (!args.username) {
  cliOutput.startError();
  process.exit(0);
}

userName = args.username;
cliOutput.greeting(userName);
currentFolder = path.resolve(os.homedir());
console.log(currentFolder);

const rlOps = { input: process.stdin, output: process.stdout };
const rl = readline.createInterface(rlOps);

// const answer = await rl.question('What do you think of Node.js? ');
// console.log(`Thank you for your valuable feedback: ${answer}`);

rl.on('line', (input) => {
  const cmd = parseCmd(input);
  console.log('Received: ', cmd);
});
// rl.close();

// console.dir(os.homedir(), os.userInfo());
// console.dir(os.userInfo());
