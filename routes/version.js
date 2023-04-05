const express = require("express");
const router = express.Router();

// {Read/Fetch Operation}
router.get("/", async (req, res) => {
    const version = 3
    const link = "https://drive.google.com/file/d/1QwVUt84V02tWHQevuGwXfsUgqtXb3MkV/view?usp=sharing"
    res.json({link:link, version:version});
  });

module.exports = router;
