const distinct = require('distinct');
const setting = require('../config/setting');
const { fieldNameToJavaName, getCSVObj, getFilesFromPath } = require('../lib/commonFunct');
const { handleEntityFile, handleFunctionFile } = require('../lib/outputFile');
const XLSX = require('xlsx');

const Logger = require('simple-node-logger'),
  opts = {
    logFilePath: 'genJavaFromExcel.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss',
  },
  log = Logger.createSimpleLogger(opts);
const { Command } = require('commander');
const program = new Command();

const processCSVFiles = async () => {
  const csvFiles = getFilesFromPath(setting.inputPath, '.csv');

  const entityFile = `${setting.inputPath}${csvFiles.find((x) => x.replace('entity') !== x)}`;
  const functionFile = `${setting.inputPath}${csvFiles.find((x) => x.replace('function') !== x)}`;

  const entityObj = await getCSVObj(entityFile);
  const functionObj = await getCSVObj(functionFile);

  return {
    Functions: functionObj,
    Entity: entityObj,
  };
};

const processXlsxFiles = () => {
  const xlsxFiles = getFilesFromPath(setting.inputPath, '.xlsx');
  const acceptXLSXSheetNames = setting.acceptXLSXSheetNames;
  const acceptXLSXSheetNamesCount = acceptXLSXSheetNames.reduce((a, c) => {
    return { ...a, [c]: 0 };
  }, {});
  const acceptXLSXSheetContent = acceptXLSXSheetNames.reduce((a, c) => {
    return { ...a, [c]: null };
  }, {});

  xlsxFiles.forEach((file) => {
    const excelFile = XLSX.readFile(file);
    acceptXLSXSheetNames.forEach((x) => {
      const sheet = excelFile.Sheets[x];
      if (sheet) {
        acceptXLSXSheetNamesCount[x] = acceptXLSXSheetNamesCount[x] + 1;

        var content = XLSX.utils.sheet_to_json(sheet);
        acceptXLSXSheetContent[x] = content;
      }
    });
  });

  // Check if the accepting sheet more than 1 sheet or not, if yes, throw error
  if (Object.keys(acceptXLSXSheetNamesCount).some((x) => acceptXLSXSheetNamesCount[x] > 1)) {
    throw `More than one sheet!`;
  }

  return acceptXLSXSheetContent;
};

const execute = async (curMode) => {
  try {
    const xlsxContent = processXlsxFiles();
    const csvContent = await processCSVFiles(curMode);

    const entityObj = [].concat(xlsxContent.Entity || []).concat(csvContent.Entity || []);
    const functionObj = [].concat(xlsxContent.Functions || []).concat(csvContent.Functions || []);
    let distinctWorkStreamList = [];

    const entityFileExists = entityObj.length > 0;
    const functionFileExists = functionObj.length > 0;

    if (entityFileExists) {
      const tableList = entityObj.map((x) => fieldNameToJavaName(x['Table Name'], true));
      const workStreamList = entityObj.map((x) => x['Workstream']);

      const distinctTableList = distinct(tableList);
      distinctWorkStreamList = distinct(workStreamList);

      handleEntityFile(distinctWorkStreamList, distinctTableList, entityObj, curMode);
    }

    if (functionFileExists) {
      const functionWorkStreamList = functionObj.map((x) => x['Microservice']);
      const bothWorkStreamList = distinct(distinctWorkStreamList.concat(functionWorkStreamList));
      handleFunctionFile(bothWorkStreamList, functionObj, curMode);
    }

    !entityFileExists && !functionFileExists && log.error('Missing files!');

    (entityFileExists || functionFileExists) && log.info(`Current Mode = ${curMode} finished!`);
  } catch (e) {
    log.error(e);
  }
};

module.exports = {
  execute,
  log,
  program,
};
