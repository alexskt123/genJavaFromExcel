const config = {
    inputPath: "./",
    outputPath: "./output/org/life/",
    outputFolders: ["entity", "controller", "service"],
    dataTypeMapping: [
        {type: "String", mapping: ["Varchar"]},
        {type: "Date", mapping: ["Datetime", "Date"]},
        {type: "UUID", mapping: ["RAW"]},
        {type: "BigDecimal", mapping: ["NUMBER", "Number"]}
    ],
    apiOutputMapping: [
        {type: "Boolean", mapping: ["True", "False"]},
        {type: "BaseResponse", mapping: ["BaseResponse"]}
    ],
    apiMethodMapping: [
        {type: "Post", mapping: ["sv"]},
        {type: "Get", mapping: ["ld", "chk", "vld"]}
    ]
}

module.exports = config