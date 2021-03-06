const { upperCase } = require('upper-case');
const { upperCaseFirst } = require('upper-case-first');
const csv = require('csvtojson');
const mkdirp = require('mkdirp');
const fs = require('fs');

const setting = require('../../config/setting');
const fileExists = require('file-exists');

const isSAD = (curMode) => {
  return curMode === 'sad';
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

const getFilesFromPath = (filePath, fileExt) => {
  try {
    const filenames = fs.readdirSync(filePath);
    const csvFiles = filenames.filter((x) => x.replace(fileExt) !== x);
    return csvFiles;
  } catch (_e) {
    return [];
  }
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
  try {
    if (!workStream || workStream === '') {
      throw 'Empty Work Stream';
    }
    mkdirp.sync(`${setting.outputPath}${workStream}`);
    setting.outputFolders.forEach((x) => mkdirp.sync(`${setting.outputPath}${workStream}/${x}`));
    return true;
  } catch (_e) {
    return false;
  }
};

const getCSVObj = async (input) => {
  try {
    const exists = fileExists.sync(input);
    if (!exists) {
      throw 'Not exists';
    }
    const jsonArray = await csv().fromFile(input);
    return filterCSVObj(jsonArray);
  } catch (_e) {
    return null;
  }
};

module.exports = {
  fieldNameToJavaName,
  createWorkStreamFolders,
  handleType,
  filterCSVObj,
  getCSVObj,
  isSAD,
  getFilesFromPath,
};
