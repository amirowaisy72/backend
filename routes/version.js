const express = require("express");
const router = express.Router();

// {Read/Fetch Operation}
router.get("/", async (req, res) => {
    const version = 1
    const link = ""
    res.json({link:link, version:version});
  });

module.exports = router;
