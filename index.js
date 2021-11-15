const distinct = require('distinct');
const config = require('./config');
const { fieldNameToJavaName, handleEntityFile, handleFunctionFile, getCSVObj } = require('./commonFunct');
const fileExists = require('file-exists');

(async () => {
    const entityFile = `${config.inputPath}entity.csv`;
    const functionFile = `${config.inputPath}function.csv`;

    if (fileExists.sync(entityFile)) {
        const entityObj = await getCSVObj(entityFile);    

        const tableList = entityObj.map(x => fieldNameToJavaName(x["Table Name"], true));
        const workStreamList = entityObj.map(x => x["Workstream"]);
    
        const distinctTableList = distinct(tableList);
        const distinctWorkStreamList = distinct(workStreamList);
    
        handleEntityFile(distinctWorkStreamList, distinctTableList, entityObj);
    
        if (fileExists.sync(functionFile)) {
            const functionObj = await getCSVObj(functionFile);
            handleFunctionFile(distinctWorkStreamList, functionObj);
        }
    }

})().catch(e => {
    console.log(e);
});


