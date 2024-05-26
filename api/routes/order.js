import express from "express";
import { post,updateOrder,deleteOrder,getOrders,getorder, weekOrders, monthOrders } from "../controllers/order.js";

const router = express.Router();

router.post("/", post)
router.get("/", getOrders)
router.put("/:id", updateOrder)
router.delete("/:id", deleteOrder)
router.get("/week", weekOrders)
router.get("/month", monthOrders)
router.get("/:id", getorder)


export default router