import express from "express";
import {registerUser, updateProfile, deleteAccount} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post(
    "/register",
    registerUser
);

router.put(
    "/profile/update",
    authMiddleware,
    upload.single("avatar"),
    updateProfile
);

router.delete(
    "/delete-account",
    authMiddleware,
    deleteAccount
);

export default router;