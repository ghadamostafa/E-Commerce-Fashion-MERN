const express = require("express");
const router = express.Router();
const User = require("../../models/user");

//get all users
router.get("/", async (requset, response, next) => {
  try {
    const users = await User.find({});
    if (!users) {
      response.status(404);
      throw new Error("No users yet!");
    } else {
      response.status(200).json({ success: true, data: users });
      next();
    }
  } catch (error) {
    next(error);
  }
});

//add admin
router.post("/create", async (request, response, next) => {
  console.log(request.body);
  const newUser = new User({ ...request.body, role: "admin" });
  try {
    await newUser.save();
    return response.status(201).json({ success: true, data: newUser });
  } catch (error) {
    next(error);
    // response.status(400);
  }
});

//disable user
router.put("/:id/disable", async (requset, response, next) => {
  try {
    const user = await User.findOne({ _id: requset.params.id });
    if (!user) {
      response.status(404).json({ error: "Not Found" });
    } else if (!user.enabled) {
      response.status(400).json({ error: "user already disabled!" });
    } else {
      user.enabled = false;
      //clear token and add middleware
      user.save();
      response.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
