const { execute, log, program } = require('./execute');

(async () => {    
    program
    .version('0.0.1')
    .description('Generate Java classes from Excel')
    .action(() => {        
        execute('sad');
    });

    await program.parseAsync(process.argv);    
})().then(() => {
    log.info('Finished');
}).catch(e => {    
    log.error(e);
});


