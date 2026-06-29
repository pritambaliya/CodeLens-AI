import Review from "../model/review.model.js";
import cloudinary from "../config/cloudanary.config.js";
import reviewCode from "../service/gemini.service.js";
import axios from "axios";
import saveAIResult from "../service/aiReview.service.js"

const createReview = async (req, res) => {
    try {

        const userId = req.user._id;
        const { title, language, code } = req.body || {};

        if (!code && !req.file) {
            return res.status(400).json({
                message: "Provide code or upload file"
            });
        }

        let fileData = null;
        let reviewCodeInput = code || "";
        if (req.file) {
            fileData = {
                name: req.file.originalname,
                url: req.file.path,
                public_id: req.file.filename,
                size: req.file.size
            };

            const response = await axios.get(req.file.path);
            reviewCodeInput = response.data;
        }

        const codeWithLineNumbers = reviewCodeInput
            .split("\n")
            .map((line,index)=>{
                return `${index + 1} | ${line}`;
            })
            .join("\n");

        const review = await Review.create({
            userId,
            title,
            language,
            code: code || "",
            file: fileData,
            status: "pending"
        });

        const aiResponseText = await reviewCode(reviewCodeInput);
        const cleanResponse = aiResponseText
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const aiResponse = JSON.parse(cleanResponse);
        
        review.aiResponse = aiResponse;
        review.optimization = aiResponse.optimization || "";
        review.timeComplexity = aiResponse.timeComplexity || {};
        review.spaceComplexity = aiResponse.spaceComplexity || {};
        review.betterApproach = aiResponse.betterApproach || "";
        review.rating = aiResponse.rating || {};
        review.status = "completed";
        await review.save();
        await saveAIResult(
            review._id,
            aiResponse
        );

        res.status(201).json({
            message: "Review created",
            review
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({
            userId: req.user._id
        });
        res.json(reviews);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getSingleReview = async (req, res) => {
    try {
        const review = await Review.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!review) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        res.json(review);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteReview = async (req, res) => {
    try {
        const review = await Review.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!review) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        if (review.file?.public_id) {
            await cloudinary.uploader.destroy(
                review.file.public_id,
                {
                    resource_type: "auto"
                }
            );
        }

        await Review.findByIdAndDelete(
            review._id
        );

        res.json({
            message: "Review and uploaded file deleted"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export { createReview, getReviews, getSingleReview, deleteReview };