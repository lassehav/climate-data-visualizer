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

module.exports = router;
