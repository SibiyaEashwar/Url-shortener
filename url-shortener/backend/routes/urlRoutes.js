const express = require("express");
const router = express.Router();

const {
  createShortUrl,
  redirectUrl,
  getMyUrls,
  deleteUrl,
} = require("../controllers/urlController");
const { protect } = require("../middleware/authMiddleware");

router.post("/shorten", protect, createShortUrl);
router.get("/my-urls", protect, getMyUrls);
router.delete("/:id", protect, deleteUrl);
router.get("/:shortCode", redirectUrl);

module.exports = router;