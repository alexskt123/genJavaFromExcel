const {
  writeFile,
  getEntityType,
  listToArray,
  getFunctionInput,
  outputServiceFile,
  outputEntityFile,
  handleEntityFile,
} = require('../../lib/outputFile');
const { config } = require('../../config/test');

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

describe('Output File', () => {
  test('Output Service File', () => {
    const { distinctWorkStreamList, functionList } = config.functionInput;
    expect(outputServiceFile(distinctWorkStreamList, functionList)).toStrictEqual(config.functionOutput);
  });
});

describe('Output File', () => {
  test('Handle Entity File', () => {
    const { distinctWorkStreamList, distinctTableList, jsonObj } = config.entityInput;
    expect(handleEntityFile(distinctWorkStreamList, distinctTableList, jsonObj)).toStrictEqual(config.entityOutput);
  });
});

describe('Output File', () => {
  test('Output Entity File', () => {
    const { distinctWorkStreamList, distinctTableList, tableFieldList } = config.entityInput;
    expect(outputEntityFile(distinctWorkStreamList, distinctTableList, tableFieldList)).toStrictEqual(
      config.entityOutput,
    );
  });
});
