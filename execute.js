const distinct = require('distinct');
const config = require('./config');
const { fieldNameToJavaName, getCSVObj, setMode } = require('./commonFunct');
const fileExists = require('file-exists');
const { handleEntityFile, handleFunctionFile } = require('./outputFile');
const Logger = require('simple-node-logger'),
	opts = {
		logFilePath:'genJavaFromExcel.log',
		timestampFormat:'YYYY-MM-DD HH:mm:ss'
	},
log = Logger.createSimpleLogger( opts );
const { Command } = require('commander');
const program = new Command();

const execute = async (curMode) => {
    const entityFile = `${config.inputPath}entity.csv`;
    const functionFile = `${config.inputPath}function.csv`;
    let distinctWorkStreamList = [];
    
    curMode && setMode(curMode);

    const entityFileExists = fileExists.sync(entityFile);
    const functionFileExists = fileExists.sync(functionFile);

    if (entityFileExists) {
        const entityObj = await getCSVObj(entityFile);    

        const tableList = entityObj.map(x => fieldNameToJavaName(x["Table Name"], true));
        const workStreamList = entityObj.map(x => x["Workstream"]);
    
        const distinctTableList = distinct(tableList);
        distinctWorkStreamList = distinct(workStreamList);
    
        handleEntityFile(distinctWorkStreamList, distinctTableList, entityObj);
    }

    if (functionFileExists) {
        const functionObj = await getCSVObj(functionFile);
        const functionWorkStreamList = functionObj.map(x => x["Microservice"]);
        const bothWorkStreamList = distinct(distinctWorkStreamList.concat(functionWorkStreamList));
        handleFunctionFile(bothWorkStreamList, functionObj);
    }

    !entityFileExists && !functionFileExists && log.error('Missing files!');
};


module.exports = {
    execute,
    log,
    program
};