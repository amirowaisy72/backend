const express = require("express");
const router = express.Router();
const Vehicles = require("../models/Vehicles");

// {Create Operation}
router.post("/create", async (req, res) => {
  let success = false;
  try {
    //store data
    const { vname, vnumber, routeStatus, mChange } = req.body; // de-Structure
    //Check if this vehicle is already registered
    let already = await Vehicles.find({ vnumber: vnumber });
    if (already.length > 0) {
      res.send({ success, message: "This vehicle is already registered" });
    } else {
      let vehicles = await Vehicles.create({
        vname: vname,
        vnumber: vnumber,
        routeStatus: routeStatus,
        mChange: mChange,
      });
      success = true;
      res.send({ success, vehicles });
    }
  } catch (error) {
    res.status(500).json({ success, error: error.message });
  }
});

// {Update Operation}
router.put("/update", async (req, res) => {
  let success = false;
  try {
    const { mChange, routeStatus, vnumber } = req.body; //De-Structure
    // Create a new data object
    const newData = {};
    if (mChange) {
      newData.mChange = mChange;
    }
    if (routeStatus) {
      newData.routeStatus = routeStatus;
    }

    //Find the document to be updated and update it
    let vehicles = await Vehicles.find({vnumber:vnumber});
    if (!vehicles) {
      res.status(404).send("Document not found");
    } else {
      vehicles = await Vehicles.findOneAndUpdate(
        {vnumber:vnumber},
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

// {Read/Fetch Operation}
router.get("/readall", async (req, res) => {
  const vehicles = await Vehicles.find({}); // fetch all Vehicle Entries
  res.json(vehicles);
});

// {Read/Fetch Operation}
router.post("/readvehicles", async (req, res) => {
  const vehicles = await Vehicles.find({
    vnumber: new RegExp(req.body.keyword, "i"),
  }); // fetch all Vehicles where keyword like this
  res.json(vehicles);
});

// {Delete Operation}
router.delete("/delete", async (req, res) => {
  let success = false;
  try {
    //Find the Document to be deleted and delete it
    let vehicles = await Vehicles.findById(req.body.id);
    if (!vehicles) {
      res.status(404).send("Document not found");
    } else {
      vehicles = await Vehicles.findByIdAndDelete(req.body.id);
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
