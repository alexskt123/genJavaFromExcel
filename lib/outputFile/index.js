const fs = require('fs');
const distinct = require('distinct');
const os = require('os');
const { titleCase } = require('title-case');
const setting = require('../../config/setting');
const {
  entityFileHeader,
  controllerFileHeader,
  serviceFileHeader,
  serviceImplFileHeader,
} = require('../../config/template');
const Trim = require('trim');
const { fieldNameToJavaName, handleType, createWorkStreamFolders, isSAD, getMode } = require('../commonFunct');
var startWith = require('start-with');
const { upperCase } = require('upper-case');

const writeFile = ({ fileName, fileContent }) => {
  try {
    fs.writeFileSync(fileName, fileContent);
    return true;
  } catch (_e) {
    return false;
  }
};

const getEntityType = (type) => {
  return type.includes('List<') ? type : type.replace('<', '').replace('>', '');
};

const listToArray = (field) => {
  return isSAD() && field.includes('List<') ? `${field.replace('List<', '').replace('>', '')}[]` : field;
};

const handleEntityFile = (distinctWorkStreamList, distinctTableList, jsonObj) => {
  try {
    distinctWorkStreamList.forEach((x) => createWorkStreamFolders(x));

    const tableFieldList = jsonObj.map((x) => {
      const fieldName = Trim(x['Field Name']);

      return {
        workStream: x['Workstream'],
        table: fieldNameToJavaName(x['Table Name'], true),
        column: upperCase(fieldName),
        field: fieldNameToJavaName(fieldName, false),
        type: handleType(
          (
            setting.dataTypeMapping.find((dt) => dt.mapping.find((m) => startWith(x['Data Type'], m))) || {
              type: x['Data Type'],
            }
          ).type,
        ),
      };
    });

    const entityFiles = outputEntityFile(distinctWorkStreamList, distinctTableList, tableFieldList);
    return entityFiles;
  } catch (_e) {
    return [];
  }
};

const handleFunctionFile = (distinctWorkStreamList, jsonObj) => {
  distinctWorkStreamList.forEach((x) => createWorkStreamFolders(x));

  const functionList = jsonObj.map((x) => {
    const logicArray = x['Logic'];
    const crossServiceArray = x['Cross Service'];
    const subFunctions = x['Sub-Function'];

    return {
      workStream: x['Microservice'],
      name: x['Common Function name'],
      input: x['Input fields'],
      output: (
        setting.apiOutputMapping.find((a) =>
          a.mapping.find((m) => startWith(upperCase(x['Output filed']), upperCase(m))),
        ) || { type: x['Output filed'] }
      ).type,
      method: (
        setting.apiMethodMapping.find((a) => a.mapping.find((m) => startWith(x['Common Function name'], m))) || {
          type: x['Common Function name'],
        }
      ).type,
      logic: logicArray.split('\n').map((x) => x.replace('-', '').trim()),
      transactional: x['Transactional?'],
      crossService: crossServiceArray.split('\n').map((x) => x.replace('-', '').trim()),
      subFunctions: subFunctions.split('\n').map((x) => x.replace('-', '').trim()),
    };
  });

  const filteredFunctionList = functionList.filter((x) => x && x.input !== '' && x.output !== '');

  outputControllerFile(distinctWorkStreamList, filteredFunctionList);
  outputServiceFile(distinctWorkStreamList, filteredFunctionList);
  !isSAD() && outputServiceImplFile(distinctWorkStreamList, filteredFunctionList);
};

const outputEntityFile = (distinctWorkStreamList, distinctTableList, tableFieldList) => {
  try {
    const fileList = [];
    distinctWorkStreamList.forEach((workStream) => {
      const curTablesWithWorkStream = distinct(
        tableFieldList.filter((x) => x.workStream === workStream).map((x) => x.table),
      );
      distinctTableList
        .filter((x) => curTablesWithWorkStream.includes(x))
        .forEach((t) => {
          const fileName = `${setting.outputPath}${workStream}/entity/${t}.java`;

          const fieldStringList = tableFieldList
            .filter((x) => x.table === t)
            .map((x) => {
              const columnString = isSAD() ? `\t@Column(name = "${x.column}")${os.EOL}` : '';
              const fieldString = `${columnString}\tprivate ${listToArray(getEntityType(x.type))} ${x.field};${os.EOL}`;
              return fieldString;
            })
            .join(os.EOL);

          const extend = isSAD() ? ` extends BaseEntityUuid` : '';

          const fileContent = `${entityFileHeader[getMode()]}${os.EOL}public class ${t}${extend} {${
            os.EOL
          }${fieldStringList}${os.EOL}} ${os.EOL}`;

          writeFile({ fileName, fileContent });
          fileList.push({ fileName, fileContent });
        });
    });
    return fileList;
  } catch (_e) {
    return [];
  }
};

const getFunctionInput = (i) => {
  return i.includes('request')
    ? `${Trim(i.split(':')[1] || '')} request`
    : `${i.split(':')[0]} ${Trim(i.split(':')[1] || '')}`;
};

const outputControllerFile = (distinctWorkStreamList, functionList) => {
  distinctWorkStreamList.forEach((workStream) => {
    const fileName = `${setting.outputPath}${workStream}/controller/${titleCase(workStream)}Controller.java`;
    const fileHeader = controllerFileHeader(workStream);

    const functionStringList = functionList
      .filter((x) => x.workStream === workStream)
      .map((x) => {
        const inputTemplate = x.input
          .split(',')
          .filter((x) => x !== 'N/A')
          .map((i) => {
            const input = i.includes('request')
              ? `${x.method === 'Post' ? '@RequestBody ' : ''} ${getFunctionInput(i)}`
              : `@RequestParam ${getFunctionInput(i)}`;
            return input;
          })
          .join(', ');

        const functionTemplate = `\t@${x.method}Mapping(value="/${x.name}", produces=APPLICATION_JSON_VALUE)
            @Override
            public ${x.output.replace('request:', '')} ${x.name} (
                    ${inputTemplate}                    
            ) throws BaseException {
            }${os.EOL}`;

        return functionTemplate;
      })
      .join(os.EOL);

    const fileTailer = '    }';

    const fileContent = `${fileHeader}${functionStringList}${fileTailer}`;

    writeFile({ fileName, fileContent });
  });
};

const outputServiceFile = (distinctWorkStreamList, functionList) => {
  try {
    const fileList = [];
    distinctWorkStreamList.forEach((workStream) => {
      const fileName = `${setting.outputPath}${workStream}/service/${titleCase(workStream)}Service.java`;
      const fileHeader = serviceFileHeader(workStream);

      const functionStringList = functionList
        .filter((x) => x.workStream === workStream)
        .map((x) => {
          const inputTemplate = x.input
            .split(',')
            .filter((x) => x !== 'N/A')
            .map((i) => {
              const input = getFunctionInput(i);
              return input;
            })
            .join(', ');

          const crossServiceTemplate = x.crossService
            .filter((x) => x.split('').length > 0)
            .map((x) => {
              return `\t\t//Please be reminded that this function will have a cross service for: ${x}${os.EOL}`;
            })
            .join(os.EOL);

          const logicTemplate = x.logic
            .filter((x) => x.split('').length > 0)
            .map((x) => {
              return `\t\t//TO-DO: ${x}${os.EOL}`;
            })
            .join(os.EOL);

          const subFunctionsTemplate = x.subFunctions
            .filter((x) => x.split('').length > 0)
            .map((y, i) => {
              const eol = i === x.subFunctions.length - 1 ? os.EOL : '';
              return i === 0 ? `\t\t//Sub-functions:${os.EOL}\t\t//${y}${eol}` : `\t\t//${y}${eol}`;
            })
            .join(os.EOL);

          const transactionalTemplate = x.transactional !== '' ? `\t@Transactional${os.EOL}` : '';

          const functionTemplate = `${transactionalTemplate}\tpublic ${x.output.replace('request:', '')} ${
            x.name
          }(${inputTemplate}) {${os.EOL}${crossServiceTemplate}${os.EOL}${subFunctionsTemplate}${
            os.EOL
          }${logicTemplate}\t}${os.EOL}`;

          return functionTemplate;
        })
        .join(os.EOL);

      const fileTailer = '}';

      const fileContent = `${fileHeader[getMode()]}${functionStringList}${fileTailer}`;

      writeFile({ fileName, fileContent });
      fileList.push({ fileName, fileContent });
    });
    console.log(fileList);
    return fileList;
  } catch (_e) {
    return [];
  }
};

const outputServiceImplFile = (distinctWorkStreamList, functionList) => {
  distinctWorkStreamList.forEach((workStream) => {
    const fileName = `${setting.outputPath}${workStream}/service/${titleCase(workStream)}ServiceImpl.java`;
    const fileHeader = serviceImplFileHeader(workStream);

    const functionStringList = functionList
      .filter((x) => x.workStream === workStream)
      .map((x) => {
        const inputTemplate = x.input
          .split(',')
          .filter((x) => x !== 'N/A')
          .map((i) => {
            const input = getFunctionInput(i);
            return input;
          })
          .join(', ');

        const functionTemplate = `\tpublic ${x.output.replace('request:', '')} ${x.name}(${inputTemplate}) {${
          os.EOL
        }\t}${os.EOL}`;

        return functionTemplate;
      })
      .join(os.EOL);

    const fileTailer = '}';

    const fileContent = `${fileHeader}${functionStringList}${fileTailer}`;

    writeFile({ fileName, fileContent });
  });
};

module.exports = {
  writeFile,
  getEntityType,
  listToArray,
  getFunctionInput,
  handleEntityFile,
  handleFunctionFile,
  outputEntityFile,
  outputControllerFile,
  outputServiceFile,
};
