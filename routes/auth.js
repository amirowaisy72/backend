const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/middleware");
const Vehicles = require("../models/Vehicles");

const JWT_SECRET = "Amirisagoodboy";

//User Authentication process starts
//ROUTE 1: Create a user using POST "/route_here" Does not require auth
router.post("/create", async (req, res) => {
  let success = false;
  try {
    //Check if user already exists
    let email = req.body.email;
    let exists = await Users.findOne({ email });
    if (exists) {
      res.send({ success, error: "User already exists" });
    } else {
      //Generate password hash
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);
      //Create a new user
      let user = await Users.create({
        type: req.body.type,
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
        password: secPassword,
      });

      //JWS Token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.send({ success, authToken });
    }
  } catch (error) {
    res.status(500).send({ success, error: error.message });
  }
});

//ROUTE 2 : Authenticate/login a user using POST "/route_here" Does not require auth
router.post("/login", async (req, res) => {
  let success = false;
  const { email, password } = req.body;
  try {
    let user = await Users.findOne({ email });
    if (!user) {
      res.status(400).json({
        success,
        error: "Please try to login with correct credentials",
      });
    } else {
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      } else {
        //Password matched & found, enail matched & found, grant him the profile page

        //JWS Token
        const payload = {
          user: {
            id: user.id,
          },
        };
        const authToken = jwt.sign(payload, JWT_SECRET);
        let type = user.type;
        success = true;
        res.send({ success, authToken, type });
      }
    }
  } catch (error) {
    res.status(500).json({ success, error: error.message });
  }
});

// ROUTE 3 : Get loggedIn user details using POST "/route_here" Login require
router.get("/getuser", middleware, async (req, res) => {
  let success = false;
  try {
    const userId = req.user.id;
    const user = await Users.findById(userId).select("-password");
    success = true;
    res.send({ success, user });
  } catch (error) {
    res.status(500).json({ success, reason: error.message });
  }
});

// ROUTE 3 : Get All Business Shops
router.get("/getallShops", async (req, res) => {
  let success = false;
  try {
    const shops = await Users.find({ type: "BUSINESS HOLDER" });
    let business = [];
    for (let index = 0; index < shops.length; index++) {
      const element = shops[index];
      let totalVehicles = await Vehicles.find({ user: element._id }); // fetch all Vehicle Entries
      totalVehicles = totalVehicles.length
      let totalCarsLobby = await Vehicles.find({ user: element._id, routeStatus: "Lobby" }); // fetch all Vehicle Entries
      totalCarsLobby = totalCarsLobby.length
      let totalCarsRoute = totalVehicles-totalCarsLobby
      //All Cars names of specific shop
      let cars = []
      const carNames = await Vehicles.find({ user: element._id }); // fetch all Vehicle Entries
      for (let index = 0; index < carNames.length; index++) {
        const element = carNames[index];
        cars.push(element.vname)
      }

      let availableCars = []
      const availableCarNames = await Vehicles.find({ user: element._id, routeStatus: "Lobby" }); // fetch all Vehicle Entries
      for (let index = 0; index < availableCarNames.length; index++) {
        const element = availableCarNames[index];
        availableCars.push(element.vname)
      }

      let newObject = {}
      newObject.id = element._id
      newObject.name = element.name
      newObject.mobile = element.mobile
      newObject.totalVehicles = totalVehicles
      newObject.totalCarsLobby = totalCarsLobby
      newObject.totalCarsRoute = totalCarsRoute
      newObject.cars = cars
      newObject.availableCars = availableCars
      business.push(newObject)
    }
    success = true;
    res.send({ success, business });
  } catch (error) {
    res.status(500).json({ success, reason: error.message });
  }
});

//ROUTE 3 : Update user theme using PUT "/auth/updateuser" Login required
router.put("/updateuser", middleware, async (req, res) => {
  let success = false;
  try {
    const { newTheme } = req.body;
    // Create a new note object
    const newData = {};
    if (newTheme) {
      newData.theme = newTheme;
    }

    //Find the user to be updated and update it
    const userId = req.user.id;
    let user = await Users.findById(userId);
    if (!user) {
      res.status(404).send("User Not Found");
    } else {
      user = await Users.findByIdAndUpdate(
        userId,
        { $set: newData },
        { new: true }
      );
      success = true;
      res.send({
        success,
        message: "Theme has been Changed",
      });
    }
  } catch (error) {
    res.status(500).json({ success, error: error.message });
  }
});

module.exports = router;
