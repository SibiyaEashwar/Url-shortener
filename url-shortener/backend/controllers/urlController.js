const Url = require("../models/Url");
const { nanoid } = require("nanoid");
const Visit = require("../models/Visit");


const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({
        message: "URL is required",
      });
    }

    const shortCode = nanoid(7);

    const url = await Url.create({
      originalUrl,
      shortCode,
      user: req.user._id,
    });

    res.status(201).json({
      message: "Short URL created",
      url,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    url.clicks += 1;
await url.save();

await Visit.create({
  url: url._id,
  userAgent: req.headers["user-agent"],
});

res.redirect(url.originalUrl);

res.redirect(url.originalUrl);

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getMyUrls = async (req, res) => {
  try {
    const urls = await Url.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(urls);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteUrl = async (req, res) => {
  try {
    const url = await Url.findById(req.params.id);

    if (!url) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    if (url.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await Url.findByIdAndDelete(req.params.id);

    res.json({
      message: "URL deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createShortUrl,
  redirectUrl,
  getMyUrls,
  deleteUrl,
};