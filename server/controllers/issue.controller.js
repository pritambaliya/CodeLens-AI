import Issue from "../model/issue.model.js";
import Review from "../model/review.model.js";

const getIssues = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const review = await Review.findOne({
            _id: reviewId,
            userId: req.user._id
        });

        if (!review) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        const issues = await Issue.find({
            reviewId
        });

        res.json(issues);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getSingleIssue = async (req, res) => {
    try {
        const issue = await Issue.findById(
            req.params.id
        );

        if (!issue) {
            return res.status(404).json({
                message: "Issue not found"
            });
        }
        res.json(issue);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteIssue = async (req, res) => {
    try {

        await Issue.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Issue deleted"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



export {
    getIssues,
    getSingleIssue,
    deleteIssue
};