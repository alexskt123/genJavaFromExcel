const { execute, log } = require('./execute');

try {
  execute('code');
} catch (e) {
  log.error(e);
}
