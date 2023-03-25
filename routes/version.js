const express = require("express");
const router = express.Router();

// {Read/Fetch Operation}
router.get("/", async (req, res) => {
    const version = 1
    res.json(version);
  });

module.exports = router;
