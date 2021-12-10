const fs = require('fs');
const distinct = require('distinct');
const os = require("os");
const { titleCase } = require('title-case');
const config = require('./config');
const { entityFileHeader, controllerFileHeader, serviceFileHeader } = require('./template');
const Trim = require('trim');
const { fieldNameToJavaName, handleType, createWorkStreamFolders, isSAD } = require('./commonFunct');
var startWith = require('start-with');
const { upperCase } = require('upper-case');

const writeFile = ({fileName, fileContent}) => {
    fs.writeFile(fileName, fileContent, function (err) {
        if (err) return console.log(err);
    });
};

const getEntityType = (type) => {
    return type.includes('List<') ? type : type.replace('<', '').replace('>', '');
};

const listToArray = (field) => {
    return isSAD() && field.includes('List<') ? `${field.replace('List<', '').replace('>', '')}[]` : field;
};

const handleEntityFile = (distinctWorkStreamList, distinctTableList, jsonObj) => {
    distinctWorkStreamList.forEach(x => createWorkStreamFolders(x));


    const tableFieldList = jsonObj.map(x => {
        const fieldName = Trim(x["Field Name"]);

        return {
            workStream: x["Workstream"],
            table: fieldNameToJavaName(x["Table Name"], true),
            column: upperCase(fieldName),
            field: fieldNameToJavaName(fieldName, false),
            type: handleType((config.dataTypeMapping.find(dt => dt.mapping.find(m => startWith(x["Data Type"], m))) || { type: x["Data Type"] }).type)
        };
    });

    outputEntityFile(distinctWorkStreamList, distinctTableList, tableFieldList);
};

const handleFunctionFile = (distinctWorkStreamList, jsonObj) => {
    distinctWorkStreamList.forEach(x => createWorkStreamFolders(x));
    
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

const outputEntityFile = (distinctWorkStreamList, distinctTableList, tableFieldList) => {

    distinctWorkStreamList.forEach(workStream => {
        const curTablesWithWorkStream = distinct(tableFieldList.filter(x => x.workStream === workStream).map(x => x.table));
        distinctTableList.filter(x => curTablesWithWorkStream.includes(x)).forEach(t => {

            const fileName = `${config.outputPath}${workStream}/entity/${t}.java`;

            const fieldStringList = tableFieldList.filter(x => x.table === t).map(x => {
                const fieldString = `\t@Column(name = "${x.column}")${os.EOL}\tprivate ${listToArray(getEntityType(x.type))} ${x.field};${os.EOL}`;
                return fieldString;
            }).join(os.EOL);

            const fileContent = `${entityFileHeader}${os.EOL}public class ${t} extends BaseEntityUuid {${os.EOL}${fieldStringList}${os.EOL}} ${os.EOL}`;

            writeFile({ fileName, fileContent });
        });
    });
};

const getFunctionInput = (i) => {
    return i.includes('request') ? `${Trim(i.split(':')[1] || '')} request` : `${i.split(':')[0]} ${Trim(i.split(':')[1] || '')}`;
};

const outputControllerFile = (distinctWorkStreamList, functionList) => {
    distinctWorkStreamList.forEach(workStream => {

        const fileName = `${config.outputPath}${workStream}/controller/${titleCase(workStream)}Controller.java`;     
        const fileHeader = controllerFileHeader(workStream);

        const functionStringList = functionList.filter(x => x.workStream === workStream).map(x => {
            const inputTemplate = x.input.split(',').filter(x => x !== 'N/A').map(i => {
                const input = i.includes('request') ? `${x.method === "Post" ? '@RequestBody ' : ''} ${getFunctionInput(i)}` : `@RequestParam ${getFunctionInput(i)}`;
                return input;
            }).join(', ');

            const functionTemplate = `\t@${x.method}Mapping(value="/${x.name}", produces=APPLICATION_JSON_VALUE)
            @Override
            public ${x.output.replace('request:', '')} ${x.name} (
                    ${inputTemplate}                    
            ) throws BaseException {
            }${os.EOL}`;

            return functionTemplate;
        }).join(os.EOL);

        const fileTailer = "    }";

        const fileContent = `${fileHeader}${functionStringList}${fileTailer}`;

        writeFile({ fileName, fileContent });
    });
};

const outputServiceFile = (distinctWorkStreamList, functionList) => {
    distinctWorkStreamList.forEach(workStream => {

        const fileName = `${config.outputPath}${workStream}/service/${titleCase(workStream)}Service.java`;        
        const fileHeader = serviceFileHeader(workStream);

        const functionStringList = functionList.filter(x => x.workStream === workStream).map(x => {
            const inputTemplate = x.input.split(',').filter(x => x !== 'N/A').map(i => {
                const input = getFunctionInput(i);
                return input;
            }).join(', ');

            const functionTemplate = `\t\tpublic ${x.output.replace('request:', '')} ${x.name}(${inputTemplate}) throws BaseException;${os.EOL}`;

            return functionTemplate;
        }).join(os.EOL);

        const fileTailer = "\t}";

        const fileContent = `${fileHeader}${functionStringList}${fileTailer}`;

        writeFile({ fileName, fileContent });
    });
};

module.exports = {
    handleEntityFile,
    handleFunctionFile,
    outputEntityFile,
    outputControllerFile,
    outputServiceFile
};
