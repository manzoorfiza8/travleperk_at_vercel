import mongoose from "mongoose";
const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    type: {
      type: String
    },
    locations: {
      type: [String]
    }
  },
  { timestamps: true }
);

export default mongoose.model("Subscription", Schema);