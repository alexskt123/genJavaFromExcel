const distinct = require('distinct');
const config = require('./config');
const { fieldNameToJavaName, getCSVObj, setMode } = require('./commonFunct');
const fileExists = require('file-exists');
const { handleEntityFile, handleFunctionFile } = require('./outputFile');

(async () => {
    const entityFile = `${config.inputPath}entity.csv`;
    const functionFile = `${config.inputPath}function.csv`;
    let distinctWorkStreamList = [];

    const curMode = process.argv[2];
    curMode && setMode(curMode);

    if (fileExists.sync(entityFile)) {
        const entityObj = await getCSVObj(entityFile);    

        const tableList = entityObj.map(x => fieldNameToJavaName(x["Table Name"], true));
        const workStreamList = entityObj.map(x => x["Workstream"]);
    
        const distinctTableList = distinct(tableList);
        distinctWorkStreamList = distinct(workStreamList);
    
        handleEntityFile(distinctWorkStreamList, distinctTableList, entityObj);
    }

    if (fileExists.sync(functionFile)) {
        const functionObj = await getCSVObj(functionFile);
        const functionWorkStreamList = functionObj.map(x => x["Microservice"]);
        const bothWorkStreamList = distinct(distinctWorkStreamList.concat(functionWorkStreamList));
        handleFunctionFile(bothWorkStreamList, functionObj);
    }

})().catch(e => {
    console.log(e);
});


