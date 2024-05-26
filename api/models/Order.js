import mongoose from "mongoose";
const Schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider' },
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
    amount: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", Schema);