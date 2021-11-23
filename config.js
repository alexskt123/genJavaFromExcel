const config = {
    inputPath: "./",
    outputPath: "./output/org/life/",
    outputFolders: ["entity", "controller", "service"],
    dataTypeMapping: [
        {type: "String", mapping: ["Varchar", "NVarchar", "Numeric"]},
        {type: "Date", mapping: ["Datetime", "Date"]},
        {type: "UUID", mapping: ["RAW", "Raw"]},
        {type: "Double", mapping: ["NUMBER", "Number"]},
        {type: "Integer", mapping: ["int", "integer"]}
    ],
    apiOutputMapping: [
        {type: "Boolean", mapping: ["True", "False"]},
        {type: "BaseResponse", mapping: ["BaseResponse"]},
        {type: "UUID", mapping: ["UUID"]},
        {type: "String", mapping: ["String"]}
    ],
    apiMethodMapping: [
        {type: "Post", mapping: ["sv"]},
        {type: "Get", mapping: ["ld", "chk", "vld"]}
    ]
};

module.exports = config;