const config = require("../config");

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: config.database.address,
    user: config.database.user,
    password: config.database.password,
    database: config.database.databaseName,
  },
});

function dbInit() {}

async function insertClimateData(time, value, datasetId) {
  return await knex("climatedata").insert({
    time,
    value,
    datasetId,
  });
}

async function getClimateDataset(datasetId) {
  return await knex.select().from("climatedata").where("datasetId", datasetId);
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
