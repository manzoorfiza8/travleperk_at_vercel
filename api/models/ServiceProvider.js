import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      // required: true,
    },
    img: {
      type: String,
    },
    city: {
      type: String,
      // required: true,
    },
    phone: {
      type: String,
      // required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    amount:{
        type: Number,
        default: true
    },
    hotel: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Hotel',
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ServiceProvider", UserSchema);