const db = require("../../services/db");
const fs = require("fs");
const parse = require("csv-parse/sync").parse;

async function doDataImport(filePath, datasetId) {
  console.log("Loading CSV file ", filePath);
  return new Promise(async (resolve, reject) => {
    try {
      const data = fs.readFileSync(filePath);
      const parseResults = parse(data, { comment: "#" });

      console.log("Inserting data to db...");
      for (i = 1; i < parseResults.length; i++) {
        await db.insertClimateData(
          parseInt(parseResults[i][0]) * 1000,
          parseResults[i][2],
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

module.exports = function () {
  return Promise.all([
    doDataImport("./climate-data/v7/SourceDataV7_GAST.csv", "v7-gast"),
  ]).then(() => {
    console.log("Dataset import done");
    //    db.dbClose();
  });
};
