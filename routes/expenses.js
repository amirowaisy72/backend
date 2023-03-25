const express = require("express");
const router = express.Router();
const Expenses = require("../models/Expenses");
const middleware = require("../middleware/middleware");

// {Create Operation} Add route/end point description here
router.post("/create", middleware, async (req, res) => {
  let success = false;
  try {
    //store data
    const { detail, price } = req.body; // de-Structure
    let expenses = await Expenses.create({
      user: req.user.id,
      detail: detail,
      price: price,
    });
    success = true;
    res.send({ success, expenses });
  } catch (error) {
    res.status(500).json({ success, error: error.message });
  }
});

// {Update Operation}
router.put("/update", async (req, res) => {
  let success = false;
  try {
    const { detail, price, id } = req.body; //De-Structure
    // Create a new data object
    const newData = {};
    if (detail) {
      newData.detail = detail;
    }
    if (price) {
      newData.price = price;
    }

    //Find the document to be updated and update it
    let expenses = await Expenses.findById(id);
    if (!expenses) {
      res.status(404).send("Document not found");
    } else {
      expenses = await Expenses.findByIdAndUpdate(
        req.body.id,
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

// {Read/Fetch Operation} Add route/end point description here
router.get("/readall", middleware, async (req, res) => {
  const expenses = await Expenses.find({user: req.user.id}); // fetch all Expense Entries
  res.json(expenses);
});

// {Delete Operation} 
router.delete("/delete", async (req, res) => {
  let success = false;
  try {
    //Find the Document to be deleted and delete it
    let expenses = await Expenses.findById(req.body.id);
    if (!expenses) {
      res.status(404).send("Document not found");
    } else {
      expenses = await Expenses.findByIdAndDelete(req.body.id);
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
