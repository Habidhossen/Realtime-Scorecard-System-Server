const express = require("express");
const { createAdmin, getAllAdmin } = require("../controllers/admin.controller");
const router = express.Router();

router.post("/admin", createAdmin);
router.get("/admin", getAllAdmin);

module.exports = router;
