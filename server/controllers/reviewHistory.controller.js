import ReviewHistory from "../model/reviewHistory.model.js";
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

export { getHistory, getSingleHistory, deleteHistory };