const express = require("express");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/userModel");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

// Get all users
userRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Register User
userRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) return res.status(500).json({ msg: "Error hashing password" });

      const user = new UserModel({ email, password: hash });
      await user.save();

      res.status(201).json({ msg: "User registered successfully" });
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Login User
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userID: user._id, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      "bruce"
    );

    res.status(200).json({ msg: "Login successful", token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Update User
userRouter.patch("/update/:userID", async (req, res) => {
  const { userID } = req.params;
  const updates = req.body;

  try {
    const user = await UserModel.findByIdAndUpdate(userID, updates, { new: true });
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.status(200).json({ msg: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Delete User
userRouter.delete("/delete/:userID", async (req, res) => {
  const { userID } = req.params;

  try {
    const user = await UserModel.findByIdAndDelete(userID);
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Get User by ID
userRouter.get("/:userID", async (req, res) => {
  const { userID } = req.params;

  try {
    const user = await UserModel.findById(userID);
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = { userRouter };
