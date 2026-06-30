import mongoose from "mongoose";

const reviewHistorySchema = new mongoose.Schema(
  {
    reviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
      required: true,
    },

    version: {
      type: Number,
      required: true,
      default: 1,
    },

    codeSnapshot: {
      type: String,
      required: true,
    },

    aiResponse: {
      type: Object,
      default: {}
    },

    score: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const ReviewHistory =
    mongoose.models.ReviewHistory ||
    mongoose.model("ReviewHistory",reviewHistorySchema);


export default ReviewHistory;