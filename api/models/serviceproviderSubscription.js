import mongoose from "mongoose";
const Schema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true
    },
    percentage: {
      type: Number,
      required: true
    },
    title: {
      type: String
    },
    active: {
      type: Boolean
    },
    serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider' },
  },
  { timestamps: true }
);

export default mongoose.model("ServiceProviderSubscription", Schema);