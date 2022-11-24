const db = require("../../services/db");
const fs = require("fs");

async function doDataImport(filePath, datasetId) {
  console.log("Loading TXT file ", filePath);
  return new Promise(async (resolve, reject) => {
    try {
      const fileAsStr = fs.readFileSync(filePath, "utf8");
      const fileArr = fileAsStr.split("\n");
      let parseStartLine = undefined;
      let yearStartPos = undefined;
      let yearEndPos = undefined;
      let valueStartPos = undefined;
      let valueEndPos = undefined;

      if (datasetId == "v3-annual") {
        parseStartLine = 57;
        yearStartPos = 2;
        yearEndPos = 6;
        valueStartPos = 9;
        valueEndPos = 15;
      } else if (datasetId == "v3-monthly") {
        parseStartLine = 54;
        yearStartPos = 1;
        yearEndPos = 6;
        valueStartPos = 28;
        valueEndPos = 34;
      }
      for (let i = parseStartLine; i < fileArr.length - 1; i++) {
        let year = fileArr[i].substring(yearStartPos, yearEndPos).trim();
        let date = year + "-01-01";

        if (datasetId == "v3-monthly") {
          let month = fileArr[i].substring(8, 10).trim();
          month = month.padStart(2, "0");
          date = year + "-" + month + "-01";
        }
        let value = parseFloat(
          fileArr[i].substring(valueStartPos, valueEndPos)
        );
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
    doDataImport("./climate-data/v3/co2_annmean_mlo.txt", "v3-annual"),
    doDataImport("./climate-data/v3/co2_mm_mlo.txt", "v3-monthly"),
  ]).then(() => {
    console.log("Dataset import done");
    //    db.dbClose();
  });
}

module.exports = importV2Data;
