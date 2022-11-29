const config = require("../config");

let dbConfig = {
  client: "mysql",
  connection: {
    user: config.database.user,
    password: config.database.password,
    database: config.database.databaseName,
  },
};
// Google App Engine will set NODE_ENV to production by default
// https://cloud.google.com/appengine/docs/standard/nodejs/runtime
if (process.env.NODE_ENV == "production") {
  dbConfig.connection.socketPath = process.env.INSTANCE_UNIX_SOCKET; // e.g. '/cloudsql/project:region:instance'
} else {
  dbConfig.connection.host = config.database.address;
}

const knex = require("knex")(dbConfig);

function dbInit() {}

async function insertClimateData(time, value, datasetId) {
  return await knex("climatedata").insert({
    time,
    value,
    datasetId,
  });
}

async function insertEmissionsData(dataRow) {
  const cleanedData = dataRow.map((d) => (d.length == 0 ? 0 : parseInt(d)));

  let insertStr = cleanedData.join(",");
  console.log(insertStr);

  return await knex.raw(`INSERT INTO countryemissions VALUES (${insertStr})`);
}

async function getClimateDataset(datasetId) {
  return await knex
    .select("time", "value")
    .from("climatedata")
    .where("datasetId", datasetId);
}

async function createV8Database(columnArray) {
  console.log(columnArray[columnArray.length - 1]);
  let countrySqlStr = "";
  for (let i = 0; i < columnArray.length; i++) {
    countrySqlStr += `${columnArray[i]} INT NOT NULL`;
    if (i < columnArray.length - 1) {
      countrySqlStr += ", ";
    }
  }

  return await knex.raw(
    `CREATE TABLE IF NOT EXISTS countryemissions (${countrySqlStr}, PRIMARY KEY (Year))`
  );
}

async function getCountryEmissionsDataset() {
  return await knex.select().table("countryemissions");
}

function dbClose() {
  knex.destroy();
}
module.exports = {
  knex,
  dbInit,
  dbClose,
  insertClimateData,
  getClimateDataset,
  createV8Database,
  insertEmissionsData,
  getCountryEmissionsDataset,
};
