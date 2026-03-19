import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    issuer: {
      type: String,
      required: true
    },

    issueDate: {
      type: Date,
      required: true
    },

    certificateUrl: {
      type: String
    },

    category: {
      type: String,
      enum: ["frontend", "backend"],
      required: true
    },

    type: {
      type: String,
      enum: ["professional", "course"],
      required: true
    }

  },
  { timestamps: true }
);

export default mongoose.model("Achievement", achievementSchema);