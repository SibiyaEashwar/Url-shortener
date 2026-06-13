const express = require("express");
const router = express.Router();

const {
  getAnalytics,
} = require("../controllers/analyticsController");

const { protect } = require("../middleware/authMiddleware");

router.get("/:urlId", protect, getAnalytics);

module.exports = router;