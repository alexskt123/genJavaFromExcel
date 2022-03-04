const { execute, log, program } = require('./run/execute');

try {
    program
        .version('0.0.1')
        .argument('<mode>', 'mode to run')
        .description('Generate Java classes from Excel')
        .action((mode) => {
            execute(mode);
        });

    program.parseAsync(process.argv);
    log.info('Finished');

} catch (e) {
    log.error(e);
}
