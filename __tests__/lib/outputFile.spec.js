const { writeFile } = require("../../lib/outputFile");

describe("Output File", () => {
    test("Write File", () => {
        expect(writeFile('')).toStrictEqual(false);
    });
});