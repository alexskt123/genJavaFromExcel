const distinct = require('distinct');
const config = require('./config');
const { fieldNameToJavaName, handleEntityFile, handleFunctionFile, getCSVObj } = require('./commonFunct');

(async () => {

    const entityObj = await getCSVObj(`${config.inputPath}entity.csv`);
    const functionObj = await getCSVObj(`${config.inputPath}function.csv`);

    const tableList = entityObj.map(x => fieldNameToJavaName(x["Table Name"], true));
    const workStreamList = entityObj.map(x => x["Workstream"]);

    const distinctTableList = distinct(tableList);
    const distinctWorkStreamList = distinct(workStreamList);

    handleEntityFile(distinctWorkStreamList, distinctTableList, entityObj);
    handleFunctionFile(distinctWorkStreamList, distinctTableList, functionObj);

})().catch(e => {
    console.log(e);
});


