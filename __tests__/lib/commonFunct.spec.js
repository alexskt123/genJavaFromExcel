const { getCSVFilesFromPath, handleType, filterCSVObj } = require("../../lib/commonFunct");

describe("Common Functions", () => {
    test("Get CSV Files from Empty Path", () => {
        expect(getCSVFilesFromPath('')).toStrictEqual([]);
    });
});

describe("Common Functions", () => {
    test("Handle Type", () => {
        expect(handleType('List<abc>')).toStrictEqual('List<Abc>');
        expect(handleType('List<ddd>')).toStrictEqual('List<Ddd>');
        expect(handleType('<ddd>')).toStrictEqual('<Ddd>');
        expect(handleType('aa')).toStrictEqual('aa');
    });
});

describe("Common Functions", () => {
    test("Filter CSV Obj", () => {
        expect(filterCSVObj([])).toStrictEqual([]);
    });
});