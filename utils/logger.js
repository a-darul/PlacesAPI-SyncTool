const green = '\x1b[32m';
const blue = '\x1b[34m';
const yellow = '\x1b[33m';
const red = '\x1b[31m';
const reset = '\x1b[0m';

const logger = {
  debug: (message) => console.log(green + `\nDEBUG: ${message}` + reset + '\n'),
  info: (message) => console.log(blue + `INFO: ${message}` + reset),
  warn: (message) => console.warn(yellow + `WARN: ${message}` + reset),
  error: (message) => console.error(red + `ERROR: ${message}` + reset),
};

module.exports = logger;
