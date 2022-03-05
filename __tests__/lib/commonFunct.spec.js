const {
  fieldNameToJavaName,
  createWorkStreamFolders,
  handleType,
  filterCSVObj,
  getCSVObj,
  setMode,
  getMode,
  isSAD,
  getCSVFilesFromPath,
} = require('../../lib/commonFunct');

describe('Common Functions', () => {
  test('Get CSV Files from Empty Path', () => {
    expect(getCSVFilesFromPath('')).toStrictEqual([]);
  });
});

describe('Common Functions', () => {
  test('Handle Type', () => {
    expect(handleType('List<abc>')).toStrictEqual('List<Abc>');
    expect(handleType('List<ddd>')).toStrictEqual('List<Ddd>');
    expect(handleType('<ddd>')).toStrictEqual('<Ddd>');
    expect(handleType('aa')).toStrictEqual('aa');
  });
});

describe('Common Functions', () => {
  test('Filter CSV Obj', () => {
    expect(filterCSVObj([])).toStrictEqual([]);
  });
});

describe('Common Functions', () => {
  test('Get CSV Obj', () => {
    expect(getCSVObj('')).resolves.toStrictEqual([]);
  });
});

describe('Common Functions', () => {
  test('Field Name to Java Name', () => {
    expect(fieldNameToJavaName('id_txt')).toStrictEqual('idTxt');
    expect(fieldNameToJavaName('name')).toStrictEqual('name');
    expect(fieldNameToJavaName('mbr_passport_no')).toStrictEqual('mbrPassportNo');
  });
});

describe('Common Functions', () => {
  test('Is SAD', () => {
    expect(isSAD()).toStrictEqual(true);
  });
});

describe('Common Functions', () => {
  test('Create Work Stream Folders', () => {
    expect(createWorkStreamFolders('')).toStrictEqual(true);
  });
});

describe('Common Functions', () => {
  test('Get Mode', () => {
    expect(getMode()).toStrictEqual('sad');
  });
});

describe('Common Functions', () => {
  test('Set Mode', () => {
    expect(setMode('code')).toStrictEqual('code');
  });
});
