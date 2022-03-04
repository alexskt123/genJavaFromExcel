const { execute, log, program } = require('./execute');

try {
    program
        .version('0.0.1')
        .description('Generate Java classes from Excel')
        .action(() => {
            execute('code');
        });

    program.parseAsync(process.argv);
    log.info('Finished');

} catch (e) {
    log.error(e);
}

