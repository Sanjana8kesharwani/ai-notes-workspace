const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  generateNoteSummary,
} = require("../controllers/aiController");

const router = express.Router();

router.post("/:id/summary", protect, generateNoteSummary);

module.exports = router;