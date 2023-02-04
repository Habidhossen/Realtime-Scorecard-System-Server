const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 4000;
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// HOME ROUTE
app.get("/", (req, res) => {
  res.status(200).send("Realtime Scorecard server is running");
});

// LISTENING SERVER
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

// IF ROUTE NOT FOUND
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

// IF SERVER ERROR
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Something broke",
  });
});
