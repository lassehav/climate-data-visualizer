const db = require("../../services/db");
//const parse = require("csv-parse/sync").parse;
const fs = require("fs");

async function doDataImport(filePath, datasetId) {
  console.log("Loading TXT file ", filePath);
  return new Promise(async (resolve, reject) => {
    try {
      const fileAsStr = fs.readFileSync(filePath, "utf8");
      const fileArr = fileAsStr.split("\n");
      for (let i = 93; i < fileArr.length - 1; i++) {
        let year = fileArr[i].substring(0, 4).trim();
        year = year.padStart(4, "0");
        const date = year + "-01-01";
        let value = parseFloat(fileArr[i].substring(7, 14));
        //console.log("date: ", date, "value: ", value);
        await db.insertClimateData(date, value, datasetId);
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
    doDataImport("./climate-data/v2/nhtemp-moberg2005.txt", "v2"),
  ]).then(() => {
    console.log("Dataset import done");
    //    db.dbClose();
  });
}

module.exports = importV2Data;
