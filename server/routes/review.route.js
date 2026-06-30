import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { createReview, getReviews, getSingleReview, deleteReview, reviewAgain } from "../controllers/review.controller.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    upload.single("file"),
    createReview
);


router.get(
    "/",
    authMiddleware,
    getReviews
);


router.get(
    "/:id",
    authMiddleware,
    getSingleReview
);


router.delete(
    "/:id",
    authMiddleware,
    deleteReview
);

router.post(
    "/:reviewId/review-again",
    authMiddleware,
    reviewAgain
);

export default router;