import Subscription from "../models/subscription.js";

export const create = async (req, res, next) => {
  const newSub = new Subscription(req.body);
  try {
    const saved = await newSub.save();
    res.status(200).json(saved);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
  console.log(req.params.id)
  console.log(req.body)
  try {
    const updated = await Subscription.findByIdAndUpdate(
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
    await Subscription.findByIdAndDelete(req.params.id);
    res.status(200).json("Subscription has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const get = async (req, res, next) => {
  try {
    const sub = await Subscription.findById(req.params.id);
    res.status(200).json(sub);
  } catch (err) {
    next(err);
  }
};
export const getAll = async (req, res, next) => {
  try {
    const sub = await Subscription.find();
    res.status(200).json(sub);
  } catch (err) {
    next(err);
  }
};
