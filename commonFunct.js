const { upperCase } = require("upper-case")

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

module.exports = {
    fieldNameToJavaName
}