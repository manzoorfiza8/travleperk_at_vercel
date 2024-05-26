import Subscription from "../models/serviceproviderSubscription.js";

export const create = async (req, res, next) => {
  console.log('Received req.query.data:', req.query.data);
    try {
        // Parse the JSON data directly
        const data = JSON.parse(req.query.data);
        
        // Construct the data object
        const Data = {
            description: data.description,
            percentage: data.percentage,
            title: data.title,
            active: true,
            serviceProvider: data.serId,
        };
        
        // Create a new subscription
        const newSub = new Subscription(Data);
        const saved = await newSub.save();
        
        // Redirect the user
        res.redirect("http://localhost:3001/serviceProvider");
    } catch (err) {
        console.error('Error in create function:', err);
        res.status(400).send('Invalid input data');
        // Optionally pass the error to the next middleware:
        // next(err);
    }
};


export const getAll = async (req, res, next) => {
  try {
    const sub = await Subscription.find({}).populate("serviceProvider", "username");
    res.status(200).json(sub);
  } catch (err) {
    next(err);
  }
};

export const get = async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const subscriptions = await Subscription.find({ user: userId }).populate("serviceProvider", "username");
    console.log(subscriptions)
    res.status(200).json(subscriptions);
  } catch (err) {
    next(err);
  }
};
