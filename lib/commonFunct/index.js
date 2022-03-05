const { upperCase } = require('upper-case');
const { upperCaseFirst } = require('upper-case-first');
const csv = require('csvtojson');
const mkdirp = require('mkdirp');
const fs = require('fs');

const setting = require('../../config/setting');

let mode = 'sad';

const setMode = (curMode) => {
  mode = curMode;
};

const getMode = () => {
  return mode;
};

const isSAD = () => {
  return getMode() === 'sad';
};

const filterCSVObj = (csvObj) => {
  return csvObj.filter((x) => x?.Workstream?.length > 0);
};

const handleType = (type) => {
  return type.includes('List<')
    ? `List<${upperCaseFirst(type.replace('List<', ''))}`
    : type.includes('<')
    ? `<${upperCaseFirst(type.replace('<', ''))}`
    : type;
};

const getCSVFilesFromPath = (filePath) => {
  const filenames = fs.readdirSync(filePath);
  const csvFiles = filenames.filter((x) => x.replace('.csv') !== x);

  return csvFiles;
};

const fieldNameToJavaName = (field, titleCase) => {
  const fieldArr = field.split('');

  let tmp = '';
  let isUpper = false;
  fieldArr.forEach((f, i) => {
    const isUnderScore = f === '_';

    if (!isUnderScore) tmp = `${tmp}${((isUpper || (titleCase && i === 0)) && upperCase(f)) || f}`;

    isUnderScore ? (isUpper = true) : (isUpper = false);
  });

  return tmp;
};

const createWorkStreamFolders = (workStream) => {
  mkdirp.sync(`${setting.outputPath}${workStream}`);
  setting.outputFolders.forEach((x) => mkdirp.sync(`${setting.outputPath}${workStream}/${x}`));
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
  isSAD,
  getCSVFilesFromPath,
};
