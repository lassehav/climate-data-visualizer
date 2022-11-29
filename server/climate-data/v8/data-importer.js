const db = require("../../services/db");
const parse = require("csv-parse/sync").parse;
const fs = require("fs");

async function doDataImport(filePath, datasetId) {
  console.log("Loading CSV file ", filePath);
  return new Promise(async (resolve, reject) => {
    try {
      const data = fs.readFileSync(filePath);
      const parseResults = parse(data, { comment: "#", delimiter: ";" });

      // First row has the country names
      await db.createV8Database(parseResults[0]);

      console.log("Inserting data to db...");
      // Start inserting data from the second row (index 1)
      for (i = 1; i < parseResults.length; i++) {
        await db.insertEmissionsData(parseResults[i]);
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
    doDataImport(
      "./climate-data/v8/National_Carbon_Emissions_2021v1.0_cleaned.csv",
      "v8"
    ),
  ]).then(() => {
    console.log("Dataset import done");
    //    db.dbClose();
  });
};
