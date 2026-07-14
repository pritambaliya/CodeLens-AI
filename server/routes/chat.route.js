import express from "express";
import { chat, deleteChat, getAllChats, getChatById } from "../controllers/chat.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/",authMiddleware, chat);

router.get("/", authMiddleware, getAllChats);

router.get("/:chatId", authMiddleware, getChatById);

router.delete("/:chatId", authMiddleware, deleteChat);


export default router;