const express = require("express");
const {
  createNews,
  getAllNews,
  getSingleNews,
  deleteNews,
} = require("../controllers/news.controller");

const router = express.Router();

router.post("/news", createNews);
router.get("/news", getAllNews);
router.get("/news/:id", getSingleNews);
router.delete("/news/:id", deleteNews);

module.exports = router;
