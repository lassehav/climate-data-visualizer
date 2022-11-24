const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./services/db");
const climateDataRoutes = require("./routes/climateData");
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/climate", climateDataRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
