import express from "express";
import {
  create,
  deleteSub,
  get,
  getAll,
  update
} from "../controllers/useSubscription.js";

const router = express.Router();
//CREATE
router.get("/add", create);
router.get("/", getAll);
router.get("/:id", get);
router.delete("/:id", deleteSub);
router.put("/:id",update)

export default router;
