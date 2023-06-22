const greeting = (username) => {
  console.log(`Welcome to the File Manager, ${username}!`);
};

const startError = () => {
  console.log('invalid start application, please use: --username=your_name');
};

const currentPath = (folderPath) => {
  console.log(`You are currently in ${folderPath}`);
};

export { greeting, startError, currentPath };
