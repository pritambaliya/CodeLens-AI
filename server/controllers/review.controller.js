import Review from "../model/review.model.js";
import cloudinary from "../config/cloudanary.config.js";


const createReview = async (req, res) => {
    try {
        const userId = req.user._id;
        const {title, language, code } = req.body || {};

        if (!code && !req.file) {
            return res.status(400).json({
                message: "Provide code or upload file"
            });
        }

        let fileData = null;

        if (req.file) {
            fileData = {
                name: req.file.originalname,
                url: req.file.path,
                public_id: req.file.filename,
                size: req.file.size
            };
        }

        const review = await Review.create({
            userId,
            title,
            language,
            code: code || "",
            file: fileData
        });

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

        if(!review){
            return res.status(404).json({
                message:"Review not found"
            });
        }

        if(review.file?.public_id){
            await cloudinary.uploader.destroy(
                review.file.public_id,
                {
                    resource_type:"auto"
                }
            );
        }

        await Review.findByIdAndDelete(
            review._id
        );

        res.json({
            message:"Review and uploaded file deleted"
        });

    } catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};

export { createReview, getReviews, getSingleReview, deleteReview };