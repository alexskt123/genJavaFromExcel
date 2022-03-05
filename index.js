const { execute, log, program } = require('./run/execute');

try {
  program
    .description('An application for generating Java Classes from csv files')
    .option('-m, --mode <type>', 'Pass the specified type of mode', 'sad');

  program.parse();

  const options = program.opts();
  const { mode } = options;
  execute(mode);
} catch (e) {
  log.error(e);
}
