const { execute, log } = require('./execute');

try {
  execute('sad');
} catch (e) {
  log.error(e);
}
