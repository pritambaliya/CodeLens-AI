import ReviewHistory from "../model/reviewhistory.model.js";
import Review from "../model/review.model.js";

const getHistory = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const history = await ReviewHistory
            .find({
                reviewId
            })
            .sort({
                version: 1
            });

        res.json(history);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getSingleHistory = async (req, res) => {
    try {

        const history =
            await ReviewHistory.findById(
                req.params.id
            );

        if (!history) {
            return res.status(404).json({
                message: "History not found"
            });
        }

        res.json(history);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteHistory = async (req, res) => {
    try {
        await ReviewHistory.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "History deleted"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getAllHistory = async (req, res) => {
    try {
        const histories = await ReviewHistory.find()
            .populate({
                path: "reviewId",
                match: { userId: req.user._id }, 
                select: "title language userId",
            })
            .sort({ createdAt: -1 });

        const filteredHistories = histories.filter(
            (history) => history.reviewId !== null
        );

        res.status(200).json(filteredHistories);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export { getHistory, getSingleHistory, deleteHistory,getAllHistory };