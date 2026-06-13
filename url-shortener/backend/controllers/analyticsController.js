const Url = require("../models/Url");
const Visit = require("../models/Visit");

const getAnalytics = async (req, res) => {
  try {
    const { urlId } = req.params;

    const url = await Url.findById(urlId);

    if (!url) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    const visits = await Visit.find({
      url: urlId,
    })
      .sort({ timestamp: -1 })
      .limit(10);

    res.json({
  totalClicks: url.clicks,
  lastVisited:
    visits.length > 0
      ? visits[0].timestamp
      : null,

  recentVisits: visits.map((v) => ({
    timestamp: v.timestamp,
    userAgent: v.userAgent,
  })),
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAnalytics,
};