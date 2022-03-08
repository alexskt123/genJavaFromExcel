const config = {
  inputPath: './',
  outputPath: './output/org/life/',
  outputFolders: ['entity', 'controller', 'service'],
  acceptXLSXSheetNames: ['Functions', 'Entity', 'Mapper'],
  dataTypeMapping: [
    { type: 'String', mapping: ['Varchar', 'NVarchar', 'Numeric', 'varchar', 'VARCHAR2'] },
    { type: 'Date', mapping: ['Datetime', 'Date', 'date'] },
    { type: 'UUID', mapping: ['RAW', 'Raw', 'raw'] },
    { type: 'BigDecimal', mapping: ['NUMBER', 'Number', 'number'] },
    { type: 'Integer', mapping: ['int', 'integer'] },
    { type: 'Boolean', mapping: ['bool', 'boolean'] },
  ],
  apiOutputMapping: [
    { type: 'Boolean', mapping: ['True', 'False'] },
    { type: 'BaseResponse', mapping: ['BaseResponse'] },
    { type: 'UUID', mapping: ['UUID'] },
    { type: 'String', mapping: ['String'] },
  ],
  apiMethodMapping: [
    { type: 'Post', mapping: ['sv'] },
    { type: 'Get', mapping: ['ld', 'chk', 'vld'] },
  ],
};

module.exports = config;
