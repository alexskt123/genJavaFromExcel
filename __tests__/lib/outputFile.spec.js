const {
  writeFile,
  getEntityType,
  listToArray,
  getFunctionInput,
  outputControllerFile,
  outputServiceFile,
  outputServiceImplFile,
  outputEntityFile,
  handleEntityFile,
  handleFunctionFile,
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
    expect(listToArray('List<Apple>', 'sad')).toStrictEqual('Apple[]');
    expect(listToArray('Apple', 'sad')).toStrictEqual('Apple');
  });
});

describe('Output File', () => {
  test('Get Function Input', () => {
    expect(getFunctionInput('request: Apple')).toStrictEqual('Apple request');
    expect(getFunctionInput('String:try')).toStrictEqual('String try');
  });
});

describe('Output File', () => {
  test('Output Controller File', () => {
    const { distinctWorkStreamList, functionList } = config.functionInput;
    expect(outputControllerFile(distinctWorkStreamList, functionList)).toStrictEqual(
      config.functionOutput.controllerFile,
    );
    expect(outputControllerFile('', '')).toStrictEqual([]);
  });
});

describe('Output File', () => {
  test('Output Service File', () => {
    const { distinctWorkStreamList, functionList } = config.functionInput;
    expect(outputServiceFile(distinctWorkStreamList, functionList, 'code')).toStrictEqual(
      config.functionOutput.serviceFile,
    );
    expect(outputServiceFile('', '', 'code')).toStrictEqual([]);
  });
});

describe('Output File', () => {
  test('Output Service Implement File', () => {
    const { distinctWorkStreamList, functionList } = config.functionInput;
    expect(outputServiceImplFile(distinctWorkStreamList, functionList, 'code')).toStrictEqual(
      config.functionOutput.serviceImplFile,
    );
    expect(outputServiceImplFile('', '', 'code')).toStrictEqual([]);
  });
});

describe('Output File', () => {
  test('Handle Function File', () => {
    const { distinctWorkStreamList, jsonObj, mapperObj } = config.functionInput;
    expect(handleFunctionFile(distinctWorkStreamList, jsonObj, mapperObj, 'code')).toStrictEqual(config.functionOutput);
    expect(handleFunctionFile('', '', 'code')).toStrictEqual({});
  });
});

describe('Output File', () => {
  test('Handle Entity File', () => {
    const { distinctWorkStreamList, distinctTableList, jsonObj } = config.entityInput;
    expect(handleEntityFile(distinctWorkStreamList, distinctTableList, jsonObj, 'sad')).toStrictEqual(
      config.entityOutput,
    );
    expect(handleEntityFile('', '', '', 'code')).toStrictEqual([]);
  });
});

describe('Output File', () => {
  test('Output Entity File', () => {
    const { distinctWorkStreamList, distinctTableList, tableFieldList } = config.entityInput;
    expect(outputEntityFile(distinctWorkStreamList, distinctTableList, tableFieldList, 'sad')).toStrictEqual(
      config.entityOutput,
    );
    expect(outputEntityFile('', '', '', 'code')).toStrictEqual([]);
  });
});
