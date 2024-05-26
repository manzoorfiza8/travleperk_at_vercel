import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import ordersRoute from "./routes/order.js";
import stripe from "./utils/stripe.js";
import subscriptionRoute from "./routes/subscription.js";
import serviceProviderRoute from "./routes/serviceProvider.js";
import usersubscriptionRoute from "./routes/userSubscription.js";
import serviceProviderSubscriptionRoute from "./routes/serviceProviderSubscription.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("errorrr",error)
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/serviceProvider", serviceProviderRoute);
app.use("/api/subscription", subscriptionRoute);
app.use("/api/stripe", stripe);
app.use("/api/userSubscription", usersubscriptionRoute);
app.use("/api/serviceProviderSubscription", serviceProviderSubscriptionRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});
