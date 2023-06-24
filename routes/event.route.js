const express = require("express");
const {
  createEvent,
  getAllEvent,
  getSingleEvent,
  deleteEvent,
} = require("../controllers/event.controller");
const router = express.Router();

router.post("/event", createEvent);
router.get("/event", getAllEvent);
router.get("/event/:id", getSingleEvent);
router.delete("/event/:id", deleteEvent);

module.exports = router;
