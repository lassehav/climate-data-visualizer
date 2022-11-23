const db = require("../../services/db");
const fs = require("fs");

async function doDataImport(filePath, datasetId) {
  console.log("Loading TXT file ", filePath);
  return new Promise(async (resolve, reject) => {
    try {
      const fileAsStr = fs.readFileSync(filePath, "utf8");
      const fileArr = fileAsStr.split("\n");

      // DE08 Data
      for (let i = 22; i < 54; i++) {
        let year = fileArr[i].substring(61, 65).trim();
        let date = year + "-01-01";

        let value = parseFloat(fileArr[i].substring(80, 86));
        console.log("date: ", date, "value: ", value);
        await db.insertClimateData(date, value, datasetId + "-de08");
      }

      // DE08-02 Data
      for (let i = 60; i < 70; i++) {
        let year = fileArr[i].substring(61, 65).trim();
        let date = year + "-01-01";

        let value = parseFloat(fileArr[i].substring(80, 86));
        console.log("date: ", date, "value: ", value);
        await db.insertClimateData(date, value, datasetId + "-de08-02");
      }

      // DSS Data
      for (let i = 75; i < 116; i++) {
        let year = fileArr[i].substring(61, 65).trim();
        let date = year + "-01-01";

        let value = parseFloat(fileArr[i].substring(80, 86));
        console.log("date: ", date, "value: ", value);
        await db.insertClimateData(date, value, datasetId + "-dss");
      }

      resolve();
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

function importV2Data() {
  return Promise.all([
    doDataImport("./climate-data/v4/lawdome.combined.dat", "v4"),
  ]).then(() => {
    console.log("Dataset import done");
    //    db.dbClose();
  });
}

module.exports = importV2Data;
