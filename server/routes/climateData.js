const db = require("../services/db");
const express = require("express");
const router = express.Router();

if (process.env.GAE_APPLICATION == undefined) {
  console.log(
    "This should only be visible in local development environment and not in GAE"
  );
  const dataImport = require("../climate-data/index");
  router.post("/init-data", async (req, res) => {
    await dataImport();
    return res.sendStatus(200);
  });
}

router.get("/v1data", async (req, res) => {
  const globalAnnualData = await db.getClimateDataset("v1-global-annual");
  const northAnnualData = await db.getClimateDataset("v1-north-annual");
  const southAnnualData = await db.getClimateDataset("v1-south-annual");
  const globalMonthlyData = await db.getClimateDataset("v1-global-monthly");
  const northMonthlyData = await db.getClimateDataset("v1-north-monthly");
  const southMonthlyData = await db.getClimateDataset("v1-south-monthly");
  res.json({
    globalMonthlyData,
    globalAnnualData,
    northMonthlyData,
    northAnnualData,
    southMonthlyData,
    southAnnualData,
  });
});

router.get("/v2data", async (req, res) => {
  const v2data = await db.getClimateDataset("v2");

  res.json({
    v2data,
  });
});

router.get("/v3data", async (req, res) => {
  const co2annual = await db.getClimateDataset("v3-annual");
  const co2monthly = await db.getClimateDataset("v3-monthly");

  res.json({
    co2annual,
    co2monthly,
  });
});

router.get("/v4data", async (req, res) => {
  const v4de08 = await db.getClimateDataset("v4-de08");
  const v4de0802 = await db.getClimateDataset("v4-de08-02");
  const v4dss = await db.getClimateDataset("v4-dss");

  res.json({
    v4de08,
    v4de0802,
    v4dss,
  });
});

router.get("/v5data", async (req, res) => {
  const v5data = await db.getClimateDataset("v5");

  res.json(v5data);
});

router.get("/v6data", async (req, res) => {
  const v6data = await db.getClimateDataset("v6");

  res.json(v6data);
});

router.get("/v7data", async (req, res) => {
  const v6data = await db.getClimateDataset("v6");
  const v7data = await db.getClimateDataset("v7-gast");

  res.json({
    v7co2: v6data,
    v7gast: v7data,
  });
});

router.get("/v8data", async (req, res) => {
  const v8data = await db.getCountryEmissionsDataset();

  res.json(v8data);
});

module.exports = router;
