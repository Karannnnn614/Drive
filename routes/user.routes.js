import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 5 }),
  body("username").trim().isLength({ min: 3 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data",
      });
    }

    try {
      const { email, username, password } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        email,
        username,
        password: hashPassword,
      });
      res.json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message: "Invalid data",
    });
  }

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userID: user._id,
        email: user.email,
        username: user.username,
      },

      process.env.JWT_SECRET
    );

    // Assuming a successful login, you can generate a token or session here
    res.cookie("token", token);
    res.render("home");
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post('/upload_file',(req,res)=>{
  res.send("file Uploaded")
})

export default router;
