const express = require("express");
const router = express.Router();
const Dispatches = require("../models/Dispatches");

// {Create Operation}
router.post("/create", async (req, res) => {
  let success = false;
  try {
    //store data
    const {
      cname,
      cmobile,
      caddress,
      guarantee,
      vnumber,
      destination,
      hours,
      price,
    } = req.body; // de-Structure
    let dispatches = await Dispatches.create({
      cname: cname,
      cmobile: cmobile,
      caddress: caddress,
      guarantee: guarantee,
      vnumber: vnumber,
      destination: destination,
      hours: hours,
      price: price
    });
    success = true;
    res.send({ success, dispatches });
  } catch (error) {
    res.status(500).json({ success, error: error.message });
  }
});

// {Update Operation}
router.put("/update", async (req, res) => {
  let success = false;
  try {
    const {
      cname,
      cmobile,
      caddress,
      guarantee,
      destination,
      price,
      hours,
      id,
    } = req.body; //De-Structure
    // Create a new data object
    const newData = {};
    if (cname) {
      newData.cname = cname;
    }
    if (cmobile) {
      newData.cmobile = cmobile;
    }
    if (caddress) {
      newData.caddress = caddress;
    }
    if (guarantee) {
      newData.guarantee = guarantee;
    }
    if (destination) {
      newData.destination = destination;
    }
    if (price) {
      newData.price = price;
    }
    if (hours) {
      newData.hours = hours;
    }

    //Find the document to be updated and update it
    let dispatches = await Dispatches.findById(id);
    if (!dispatches) {
      res.status(404).send("Document not found");
    } else {
      dispatches = await Dispatches.findByIdAndUpdate(
        id,
        { $set: newData },
        { new: true }
      );
      success = true;
      res.send({
        success,
        message: "Document has been updated",
      });
    }
  } catch (error) {
    res.status(500).json({ success, error: error.message });
  }
});

// {Read/Fetch Operation} Read All
router.get("/readall", async (req, res) => {
  const dispatches = await Dispatches.find({}).sort({date:-1}); // fetch all Dispatch Entries
  res.json(dispatches);
});

// {Read/Fetch Operation} Read Searched customers
router.post("/readcustomer", async (req, res) => {
  const dispatches = await Dispatches.find({
    cname: new RegExp(req.body.keyword, "i"),
  }) // fetch all Dispatches where keyword like this
  res.json(dispatches);
});

// {Read/Fetch Operation} Read General Search
router.post("/general", async (req, res) => {
  const dispatches = await Dispatches.find({
    $or: [
      { cname: new RegExp(req.body.keyword, "i") },
      { cmobile: new RegExp(req.body.keyword, "i") },
      { caddress: new RegExp(req.body.keyword, "i") },
      { guarantee: new RegExp(req.body.keyword, "i") },
      { vnumber: new RegExp(req.body.keyword, "i") },
      { destination: new RegExp(req.body.keyword, "i") },
    ],
  }); // fetch all Dispatches where keyword like this
  res.json(dispatches);
});

// {Delete Operation} Delete
router.delete("/delete", async (req, res) => {
  let success = false;
  try {
    //Find the Document to be deleted and delete it
    let dispatches = await Dispatches.findById(req.body.id);
    if (!dispatches) {
      res.status(404).send("Document not found");
    } else {
      dispatches = await Dispatches.findByIdAndDelete(req.body.id);
      success = true;
      res.send({
        success,
        message: "Document at id : " + req.body.id + " Has been deleted",
      });
    }
  } catch (error) {
    res.status(500).json({ success, error: error.message });
  }
});

module.exports = router;
