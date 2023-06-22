import * as cliOutput from './cliOutput.js';

let userName;
const args = parseArgs();
if (!args.username) {
  cliOutput.startError();
  process.exit(0);
}

userName = args.username;
cliOutput.greeting(userName);



function parseArgs() {
  const [node, file, ...args] = process.argv;

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