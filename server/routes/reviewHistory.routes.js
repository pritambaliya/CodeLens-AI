import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {getHistory, getSingleHistory, deleteHistory} from "../controllers/reviewHistory.controller.js";

const router = express.Router();


router.get(
    "/review/:reviewId",
    authMiddleware,
    getHistory
);

router.get(
    "/:id",
    authMiddleware,
    getSingleHistory
);


router.delete(
    "/:id",
    authMiddleware,
    deleteHistory
);


export default router;