const express = require("express");
const {
  handleCreateShortId,
  handleAnalyticsCount,
} = require("../controllers/url");
const router = express.Router();

router.post("/", handleCreateShortId);

router.get("/analytics/:shortId", handleAnalyticsCount);
module.exports = router;
