const { writeFile, getEntityType, listToArray, getFunctionInput } = require('../../lib/outputFile');

describe('Output File', () => {
  test('Write File', () => {
    expect(writeFile('')).toStrictEqual(false);
  });
});

describe('Output File', () => {
  test('Get Entity Type', () => {
    expect(getEntityType('List<Apple>')).toStrictEqual('List<Apple>');
    expect(getEntityType('<Apple>')).toStrictEqual('Apple');
    expect(getEntityType('Apple')).toStrictEqual('Apple');
  });
});

describe('Output File', () => {
  test('List to Array', () => {
    expect(listToArray('List<Apple>')).toStrictEqual('Apple[]');
    expect(listToArray('Apple')).toStrictEqual('Apple');
  });
});

describe('Output File', () => {
  test('Get Function Input', () => {
    expect(getFunctionInput('request: Apple')).toStrictEqual('Apple request');
    expect(getFunctionInput('String:try')).toStrictEqual('String try');
  });
});
