import mongoose from "mongoose";
const Schema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    title: {
      type: String
    },
    active: {
      type: Boolean
    },
    locations: {
      type: [String]
    },
    type: {
      type: String
    },
    img: {
      type: String,
      required: true
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model("UserSubscription", Schema);