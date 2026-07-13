import express from "express";
import { chat, deleteChat  } from "../controllers/chat.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/",authMiddleware, chat);
router.delete("/:chatId", authMiddleware, deleteChat);

export default router;