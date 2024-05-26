import Order from "../models/Order.js";
import Hotel from "../models/Hotel.js";
import ServiceProvider from "../models/ServiceProvider.js";

export const post = async (req, res, next) => {
    console.log(req.body);
    const hotel = await Hotel.findById(req.body.hotelId);
    console.log(hotel.cheapestPrice)
    let price = hotel.cheapestPrice * req.body.count
    await ServiceProvider.findOne({hotel:req.body.hotelId}).exec().then((serviceProvider) => {
    console.log(serviceProvider._id);
    const data = {
        user: req.body.userid,
        serviceProvider: serviceProvider._id,
        hotel: req.body.hotelId,
        amount: price
    }
    const newOrder = new Order(data);
    const seram = (price * 0.7) + serviceProvider.amount
    try {
        const updatedServiceProvider = ServiceProvider.findByIdAndUpdate(
            serviceProvider._id,
            { $set: { amount: seram } },
            { new: true }
        ).exec().then((up) => {
            const saved = newOrder.save();
            res.status(200).json(saved);
        });
    } catch (err) {
        next(err);
    }
    })
}
export const updateOrder = async (req,res,next)=>{
    try {
      const updated = await Order.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  }
export const deleteOrder = async (req, res, next) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted.");
    } catch (err) {
        next(err);
    }
}
export const getorder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
}
export const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({}).populate("user","username").populate("serviceProvider", "username").populate("hotel","name")
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
}
export const weekOrders = async (req,res,next) => {
    try {
        // Calculate the start and end dates of the previous week
        const endDate = new Date();  // Current date
        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - 7);  // Subtract 7 days
        console.log(startDate,endDate)

        // Query the database for orders within the last week
        const orders = await Order.find({
          createdAt: { $gte: startDate, $lt: endDate }
        }).populate("user","username").populate("serviceProvider", "username").populate("hotel","name")

        res.status(200).json({ orders });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
export const monthOrders = async (req,res,next) => {
    try {
        // Calculate the start and end dates of the previous month
        const endDate = new Date();  // Current date
        const startDate = new Date(endDate);
        startDate.setMonth(endDate.getMonth() - 1);  // Subtract 1 month
    
        // Query the database for orders within the last month
        const orders = await Order.find({
          createdAt: { $gte: startDate, $lt: endDate }
        }).populate("user","username").populate("serviceProvider", "username").populate("hotel","name")
    
        res.status(200).json({ orders });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}