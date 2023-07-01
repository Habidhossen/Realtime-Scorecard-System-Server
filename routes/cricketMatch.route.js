const express = require("express");
const {
  createCricketMatch,
  getAllCricketMatch,
  deleteCricketMatch,
  getLatestCricketMatch,
  updateCricketScore,
  matchFinish,
} = require("../controllers/cricketMatch.controller");

const router = express.Router();

router.post("/cricket-match", createCricketMatch);
router.get("/cricket-match", getAllCricketMatch);
router.delete("/cricket-match/:id", deleteCricketMatch);
router.get("/latest-cricket-match", getLatestCricketMatch);
router.patch("/update-cricket-score/:id", updateCricketScore);
router.patch("/finish-cricket-match/:id", matchFinish);

module.exports = router;
