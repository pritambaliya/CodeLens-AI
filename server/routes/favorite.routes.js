import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { addFavorite, getFavorites, removeFavorite} from "../controllers/favorite.controller.js";

const router = express.Router();


router.post(
    "/:reviewId",
    authMiddleware,
    addFavorite
);


router.get(
    "/",
    authMiddleware,
    getFavorites
);


router.delete(
    "/:reviewId",
    authMiddleware,
    removeFavorite
);


export default router;