const express = require("express");
const URL = require("../models/user");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allUrls = await URL.find({});
    return res.render("home", {
      urls: allUrls,
    });
  } catch (error) {
    res.status(500).send("Error retrieving URLs");
  }
});

module.exports = router;
