const db = require("../../services/db");
const fs = require("fs");

async function doDataImport(filePath, datasetId) {
  console.log("Loading TXT file ", filePath);
  return new Promise(async (resolve, reject) => {
    try {
      const fileAsStr = fs.readFileSync(filePath, "utf8");
      const fileArr = fileAsStr.split("\n");

      for (let i = 21; i < fileArr.length; i++) {
        const rowArr = fileArr[i].split("\t");
        const year = parseInt(rowArr[2]) - 2003 + "BC";
        const co2 = rowArr[3];
        //console.log("y:" + year + ", co2: " + co2);

        await db.insertClimateData(year, co2, datasetId);
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
    doDataImport("./climate-data/v5/vostok.icecore.co2.txt", "v5"),
  ]).then(() => {
    console.log("Dataset import done");
    //    db.dbClose();
  });
};
