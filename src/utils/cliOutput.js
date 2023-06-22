const greeting = (username) => {
  console.log(`Welcome to the File Manager, ${username}!`);
};

const invalidInput = () => {
  console.log('Invalid input');
};

const currentPath = (folderPath) => {
  console.log(`You are currently in ${folderPath}`);
};

export { greeting, invalidInput, currentPath };
