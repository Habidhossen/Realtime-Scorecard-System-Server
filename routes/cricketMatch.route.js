const express = require("express");
const {
  createCricketMatch,
  getAllCricketMatch,
  deleteCricketMatch,
  getLatestCricketMatch,
} = require("../controllers/cricketMatch.controller");

const router = express.Router();

router.post("/cricket-match", createCricketMatch);
router.get("/cricket-match", getAllCricketMatch);
router.get("/latest-cricket-match", getLatestCricketMatch);
// router.get("/cricket-match/:id", getSingleNews);
router.delete("/cricket-match/:id", deleteCricketMatch);

module.exports = router;
