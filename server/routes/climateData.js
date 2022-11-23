const dataImport = require("../climate-data/index");
const db = require("../services/db");
const express = require("express");
const router = express.Router();

router.post("/init-data", async (req, res) => {
  await dataImport();
  return res.sendStatus(200);
});

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

module.exports = router;
