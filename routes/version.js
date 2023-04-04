const express = require("express");
const router = express.Router();

// {Read/Fetch Operation}
router.get("/", async (req, res) => {
    const version = 2
    const link = "https://drive.google.com/file/d/194d41QvbSi-YipfIr1cOfiumQC6hrwnZ/view?usp=sharing"
    res.json({link:link, version:version});
  });

module.exports = router;
