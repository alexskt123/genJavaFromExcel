const fs = require('fs');
const distinct = require('distinct');
const os = require("os");
const { titleCase } = require('title-case');
const config = require('./config');
const { entityFileHeader, controllerFileHeader, serviceFileHeader } = require('./template');
const Trim = require('trim');

const writeFile = ({fileName, fileContent}) => {
    fs.writeFile(fileName, fileContent, function (err) {
        if (err) return console.log(err);
    });
};

const getEntityType = (type) => {
    return type.includes('List<') ? type : type.replace('<', '').replace('>', '');
};

const outputEntityFile = (distinctWorkStreamList, distinctTableList, tableFieldList) => {

    distinctWorkStreamList.forEach(workStream => {
        const curTablesWithWorkStream = distinct(tableFieldList.filter(x => x.workStream === workStream).map(x => x.table));
        distinctTableList.filter(x => curTablesWithWorkStream.includes(x)).forEach(t => {

            const fileName = `${config.outputPath}${workStream}/entity/${t}.java`;

            const fieldStringList = tableFieldList.filter(x => x.table === t).map(x => {
                const fieldString = `\t@Column(name = "${x.column}")${os.EOL}\tprivate ${getEntityType(x.type)} ${x.field};${os.EOL}`;
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
            public ${x.output} ${x.name} (
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

            const functionTemplate = `\t\tpublic ${x.output} ${x.name}(${inputTemplate}) throws BaseException;${os.EOL}`;

            return functionTemplate;
        }).join(os.EOL);

        const fileTailer = "\t}";

        const fileContent = `${fileHeader}${functionStringList}${fileTailer}`;

        writeFile({ fileName, fileContent });
    });
};

module.exports = {
    outputEntityFile,
    outputControllerFile,
    outputServiceFile
};
