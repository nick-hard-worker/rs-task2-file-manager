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

const parseCmd = (line) => {
  const arrFromLine = line.split(' ');
  return {
    command: arrFromLine[0],
    arg1: arrFromLine[1]?.replace(/^--/, ''),
    arg2: arrFromLine[2]
  };
};

export { parseArgs, parseCmd };