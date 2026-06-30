import Review from "../model/review.model.js";
import Issue from "../model/issue.model.js";


const getDashboard = async (req, res) => {
    try {
        const userId = req.user._id;
        const totalReviews = await Review.countDocuments({
            userId
        });

        const reviews = await Review.find({
            userId
        }).select("_id");

        const reviewIds = reviews.map(
            review => review._id
        );

        const totalIssues = await Issue.countDocuments({
            reviewId: {
                $in: reviewIds
            }
        });

        const bugs = await Issue.countDocuments({
            reviewId: {
                $in: reviewIds
            },
            type: "Bug"
        });

        const security = await Issue.countDocuments({
            reviewId: {
                $in: reviewIds
            },
            type: "Security"
        });

        const performance = await Issue.countDocuments({
            reviewId: {
                $in: reviewIds
            },
            type: "Performance"
        });

        const recentReviews = await Review.find({
            userId
        })
            .sort({
                createdAt: -1
            })
            .limit(5);

        res.json({
            totalReviews,
            totalIssues,
            issues: {
                bugs,
                security,
                performance
            },
            recentReviews
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export { getDashboard };