const db = require("../../services/db");
const parse = require("csv-parse/sync").parse;
const fs = require("fs");

async function doDataImport(filePath, datasetId) {
  console.log("Loading CSV file ", filePath);
  return new Promise(async (resolve, reject) => {
    try {
      const data = fs.readFileSync(filePath);
      const parseResults = parse(data, { comment: "#" });
      console.log(parseResults);
      console.log("Inserting data to db...");
      for (i = 1; i < parseResults.length; i++) {
        await db.insertClimateData(
          parseResults[i][0],
          parseResults[i][1],
          datasetId
        );
      }
      resolve();
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

function importV1Data() {
  return Promise.all([
    doDataImport(
      "./climate-data/v1/HadCRUT.5.0.1.0.analysis.summary_series.global.annual.csv",
      "v1-global-annual"
    ),
    doDataImport(
      "./climate-data/v1/HadCRUT.5.0.1.0.analysis.summary_series.global.monthly.csv",
      "v1-global-monthly"
    ),
    doDataImport(
      "./climate-data/v1/HadCRUT.5.0.1.0.analysis.summary_series.northern_hemisphere.annual.csv",
      "v1-north-annual"
    ),
    doDataImport(
      "./climate-data/v1/HadCRUT.5.0.1.0.analysis.summary_series.northern_hemisphere.monthly.csv",
      "v1-north-monthly"
    ),
    doDataImport(
      "./climate-data/v1/HadCRUT.5.0.1.0.analysis.summary_series.southern_hemisphere.annual.csv",
      "v1-south-annual"
    ),
    doDataImport(
      "./climate-data/v1/HadCRUT.5.0.1.0.analysis.summary_series.southern_hemisphere.monthly.csv",
      "v1-south-monthly"
    ),
  ]).then(() => {
    console.log("Dataset import done");
    //    db.dbClose();
  });
}

module.exports = importV1Data;
