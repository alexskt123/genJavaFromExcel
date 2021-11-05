const { upperCase } = require("upper-case")
fs = require('fs')

const fieldNameToJavaName = (field, titleCase) => {
    const fieldArr = field.split('')

    let tmp = ''
    let isUpper = false
    fieldArr.forEach((f, i) => {
        const isUnderScore = f === "_"

        if (!isUnderScore)
            tmp = `${tmp}${(isUpper || titleCase && i === 0) && upperCase(f) || f}`

        isUnderScore ? isUpper = true : isUpper = false
    })

    return tmp
}

const writeFile = ({fileName, fileContent}) => {
    fs.writeFile(fileName, fileContent, function (err) {
        if (err) return console.log(err);
    });
}

module.exports = {
    fieldNameToJavaName,
    writeFile
}