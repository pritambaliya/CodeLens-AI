import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {getIssues, getSingleIssue, deleteIssue} from "../controllers/issue.controller.js";

const router = express.Router();

router.get(
    "/review/:reviewId",
    authMiddleware,
    getIssues
);

router.get(
    "/:id",
    authMiddleware,
    getSingleIssue
);

router.delete(
    "/:id",
    authMiddleware,
    deleteIssue
);



export default router;