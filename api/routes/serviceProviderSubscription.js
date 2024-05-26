import express from "express";
import {
  create,
  getAll,
  get
} from "../controllers/serviceProviderSubscription.js";

const router = express.Router();
//CREATE
router.get("/add", create);
router.get("/", getAll);
router.get("/:id", get);

export default router;
