const { upperCase } = require("upper-case");
const { upperCaseFirst } = require('upper-case-first');
const csv = require('csvtojson');
const mkdirp = require('mkdirp');

const config = require('./config');


let mode = "sad";

const setMode = (curMode) => {
    mode = curMode;
};

const getMode = () => {
    return mode;
};

const isSAD = () => {
    return getMode() === "sad";
};

const filterCSVObj = (csvObj) => {
    return csvObj.filter(x => x?.Workstream?.length > 0);
};

const handleType = (type) => {
    return type.includes('List<') ? `List<${upperCaseFirst(type.replace('List<', ''))}`
            : type.includes('Map<') ? `Map<${upperCaseFirst(type.replace('Map<', ''))}`
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



module.exports = {
    fieldNameToJavaName,   
    createWorkStreamFolders, 
    handleType,
    filterCSVObj,
    getCSVObj,
    setMode,
    getMode,
    isSAD
};