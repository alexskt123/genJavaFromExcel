const { upperCase } = require("upper-case");
const { upperCaseFirst } = require('upper-case-first');
const csv = require('csvtojson');
var startWith = require('start-with');
const mkdirp = require('mkdirp');

const config = require('./config');
const { outputEntityFile, outputControllerFile, outputServiceFile } = require('./outputFile');

const filterCSVObj = (csvObj) => {
    return csvObj.filter(x => x?.Workstream?.length > 0);
};

const handleType = (type) => {
    return type.includes('List<') ? `List<${upperCaseFirst(type.replace('List<', ''))}`
            : type.includes('<') ? `<${upperCaseFirst(type.replace('<', ''))}`
            : type;
};

const fieldNameToJavaName = (field, titleCase) => {
    const fieldArr = field.split('');

    let tmp = '';
    let isUpper = false;
    fieldArr.forEach((f, i) => {
        const isUnderScore = f === "_";

        if (!isUnderScore)
            tmp = `${tmp}${(isUpper || titleCase && i === 0) && upperCase(f) || f}`;

        isUnderScore ? isUpper = true : isUpper = false;
    });

    return tmp;
};

const createWorkStreamFolders = (workStream) => {
    mkdirp.sync(`${config.outputPath}${workStream}`);
    config.outputFolders.forEach(x => mkdirp.sync(`${config.outputPath}${workStream}/${x}`));
};

const getCSVObj = async (input) => {
    const jsonArray = await csv().fromFile(input);
    return filterCSVObj(jsonArray);
};

const handleEntityFile = (distinctWorkStreamList, distinctTableList, jsonObj) => {
    distinctWorkStreamList.forEach(x => createWorkStreamFolders(x));


    const tableFieldList = jsonObj.map(x => {

        return {
            workStream: x["Workstream"],
            table: fieldNameToJavaName(x["Table Name"], true),
            column: upperCase(x["Field Name"]),
            field: fieldNameToJavaName(x["Field Name"], false),
            type: handleType((config.dataTypeMapping.find(dt => dt.mapping.find(m => startWith(x["Data Type"], m))) || { type: x["Data Type"] }).type)
        };
    });

    outputEntityFile(distinctWorkStreamList, distinctTableList.filter(x => !x.includes("Hst")), tableFieldList);
};

const handleFunctionFile = (distinctWorkStreamList, jsonObj) => {
    const functionList = jsonObj.map(x => {

        return {
            workStream: x["Microservice"],
            name: x["Common Function name"],
            input: x["Input fields"],
            output: (config.apiOutputMapping.find(a => a.mapping.find(m => startWith(upperCase(x["Output filed"]), upperCase(m)))) || { type: x["Output filed"] }).type,
            method: (config.apiMethodMapping.find(a => a.mapping.find(m => startWith(x["Common Function name"], m))) || { type: x["Common Function name"] }).type,
        };
    });

    const filteredFunctionList = functionList.filter(x => x && x.input !== '' && x.output !== '');

    outputControllerFile(distinctWorkStreamList, filteredFunctionList);
    outputServiceFile(distinctWorkStreamList, filteredFunctionList);
};

module.exports = {
    fieldNameToJavaName,    
    handleType,
    filterCSVObj,
    handleEntityFile,
    handleFunctionFile,
    getCSVObj
};