const csv = require('csvtojson')
const distinct = require('distinct');
var startWith = require('start-with')
const { upperCase } = require("upper-case");
const mkdirp = require('mkdirp')

const config = require('./config')
const { outputEntityFile, outputControllerFile, outputServiceFile } = require('./outputFile');
const { fieldNameToJavaName } = require('./commonFunct');

const createWorkStreamFolders = (workStream) => {
    mkdirp.sync(`./output/org/life/${workStream}`)
    mkdirp.sync(`./output/org/life/${workStream}/entity`)
    mkdirp.sync(`./output/org/life/${workStream}/controller`)
    mkdirp.sync(`./output/org/life/${workStream}/service`)
}

let distinctTableList
let distinctWorkStreamList
csv()
    .fromFile('entity.csv')
    .then((jsonObj) => {
        const tableList = jsonObj.map(x => fieldNameToJavaName(x["Table Name"], true))
        const workStreamList = jsonObj.map(x => x["Workstream"])
        distinctTableList = distinct(tableList)
        distinctWorkStreamList = distinct(workStreamList)


        distinctWorkStreamList.forEach(x => createWorkStreamFolders(x))


        const tableFieldList = jsonObj.map(x => {

            return {
                workStream: x["Workstream"],
                table: fieldNameToJavaName(x["Table Name"], true),
                column: upperCase(x["Field Name"]),
                field: fieldNameToJavaName(x["Field Name"], false),
                type: (config.dataTypeMapping.find(dt => dt.mapping.find(m => startWith(x["Data Type"], m))) || { type: x["Data Type"] }).type
            }
        })

        outputEntityFile(distinctWorkStreamList, distinctTableList.filter(x => !x.includes("Hst")), tableFieldList)
    })



csv()
    .fromFile('function.csv')
    .then((jsonObj) => {

        const functionList = jsonObj.map(x => {

            return {
                workStream: x["Microservice"],
                name: x["Common Function name"],
                input: x["Input fields"],
                output: (config.apiOutputMapping.find(a => a.mapping.find(m => startWith(upperCase(x["Output filed"]), upperCase(m)))) || { type: x["Output filed"] }).type,
                method: (config.apiMethodMapping.find(a => a.mapping.find(m => startWith(x["Common Function name"], m))) || { type: x["Common Function name"] }).type,
            }
        })

        const filteredFunctionList = functionList.filter(x => x.input !== '' && x.output !== '')

        outputControllerFile(distinctWorkStreamList, filteredFunctionList, distinctTableList.filter(x => !x.includes("Hst")))
        outputServiceFile(distinctWorkStreamList, filteredFunctionList, distinctTableList.filter(x => !x.includes("Hst")))
    })
