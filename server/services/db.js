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

async function getClimateDataset(datasetId) {
  return await knex
    .select("time", "value")
    .from("climatedata")
    .where("datasetId", datasetId);
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
};
