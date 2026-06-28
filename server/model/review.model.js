import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    language: {
      type: String,
      required: true,
    },

    //for copy-paste code
    code: {
      type: String,
      default:""
    },

    //Upload file
    file: {
      name: {
        type: String
      },
      url: {
        type: String
      },
      size: {
        type: Number
      }
    },

    aiResponse: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;