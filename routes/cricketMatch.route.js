const express = require("express");
const {
  createCricketMatch,
  getAllCricketMatch,
} = require("../controllers/cricketMatch.controller");

const router = express.Router();

router.post("/cricket-match", createCricketMatch);
router.get("/cricket-match", getAllCricketMatch);
// router.get("/cricket-match/:id", getSingleNews);
// router.delete("/cricket-match/:id", deleteNews);

module.exports = router;
