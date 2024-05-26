import express from "express";
import {
  create,
  deleteSub,
  get,
  getAll,
  update
} from "../controllers/subscrption.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/", verifyAdmin, create);
router.get("/", getAll);
router.get("/:id", get);
router.delete("/:id", deleteSub);
router.put("/:id",update)

export default router;
