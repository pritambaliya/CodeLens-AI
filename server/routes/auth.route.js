import express from "express";
import {login, logout } from "../controllers/auth.controller.js";
import passport from "../config/passport.js";
import jwt from "jsonwebtoken";
import {forgotPassword, verifyOTP, resetPassword} from '../controllers/forgotpass.controller.js'

const router = express.Router();

router.post("/login", login);

router.get("/logout", logout);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account"
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "https://codelens-ai-2v7l.onrender.com/login",
  }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect("https://codelens-ai-2v7l.onrender.com/dashboard");
  }
);

router.post("/forgot-password", forgotPassword);

router.post("/verify-otp", verifyOTP);

router.post("/reset-password", resetPassword);

export default router;