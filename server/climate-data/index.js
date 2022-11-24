const v1DataImport = require("./v1/data-importer");
const v2DataImport = require("./v2/data-importer");
const v3DataImport = require("./v3/data-importer");
const v4DataImport = require("./v4/data-importer");

module.exports = function () {
  v1DataImport();
  v2DataImport();
  v3DataImport();
  v4DataImport();
};
