import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    reviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "Bug",
        "Security",
        "Performance",
        "Best Practice"
      ],
      required: true,
    },

    severity: {
      type: String,
      enum: [
        "Low",
        "Medium",
        "High"
      ],
      default: "Low",
    },

    description: {
      type: String,
      required: true,
    },

    lineNumber: {
      type: Number,
      default: null,
    },

    suggestion: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);


const Issue = mongoose.model("Issue", issueSchema);

export default Issue;