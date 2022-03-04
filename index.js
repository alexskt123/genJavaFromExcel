
const { execute, log, program } = require('./run/execute');

(async () => {    
    program
    .version('0.0.1')
    .argument('<mode>', 'mode to run')
    .description('Generate Java classes from Excel')
    .action((mode) => {        
        execute(mode);
    });

    await program.parseAsync(process.argv);    
})().then(() => {
    log.info('Finished');
}).catch(e => {    
    log.error(e);
});


