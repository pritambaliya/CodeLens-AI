import Favorite from "../model/favorite.model.js";
import Review from "../model/review.model.js";

const addFavorite = async (req, res) => {
    try {
        const userId = req.user._id;
        const { reviewId } = req.params;
        const review = await Review.findOne({
            _id: reviewId,
            userId
        });

        if (!review) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        const exists = await Favorite.findOne({
            userId,
            reviewId
        });

        if (exists) {
            return res.status(400).json({
                message: "Already added to favorites"
            });
        }

        const favorite = await Favorite.create({
            userId,
            reviewId
        });

        res.status(201).json({
            message: "Added to favorites",
            favorite
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({
            userId: req.user._id
        })
            .populate("reviewId");

        res.json(favorites);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const removeFavorite = async (req, res) => {
    try {
        await Favorite.findOneAndDelete({
            userId: req.user._id,
            reviewId: req.params.reviewId
        });

        res.json({
            message: "Removed from favorites"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


export { addFavorite, getFavorites, removeFavorite };