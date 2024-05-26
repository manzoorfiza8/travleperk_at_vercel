import UserSubscription from "../models/userSubscriptions.js";

export const create = async (req, res, next) => {

  console.log(req.query)
  const user_data = req.query.data;
  const data = JSON.parse(decodeURIComponent(user_data));
  const Data =  {
    description:data.description,
    price:data.price,
    title:data.title,
    active:true,
    type:data.type,
    locations:data.locations,
    user:data.userId,
    img:data.img
  }
  const newSub = new UserSubscription(Data);
  try {
    const saved = await newSub.save();
    res.redirect("http://localhost:3000/");
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
  try {
    const updated = await UserSubscription.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteSub = async (req, res, next) => {
  try {
    await UserSubscription.findByIdAndDelete(req.params.id);
    res.status(200).json("Subscription has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const get = async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const subscriptions = await UserSubscription.find({ user: userId });
    console.log(subscriptions)
    res.status(200).json(subscriptions);
  } catch (err) {
    next(err);
  }
};
export const getAll = async (req, res, next) => {
  try {
    const sub = await UserSubscription.find({}).populate("user","username");
    res.status(200).json(sub);
  } catch (err) {
    next(err);
  }
};
