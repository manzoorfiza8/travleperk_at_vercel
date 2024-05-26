import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  deleteRooms,
  updateRoomAvailability,
} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:hotelid", verifyAdmin, createRoom);

//UPDATE
router.put("/availability/:id/:rid", updateRoomAvailability);
router.put("/:id/:hotelId", verifyAdmin, updateRoom);
//DELETE
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);
router.delete("/:id", verifyAdmin, deleteRooms);
//GET

router.get("/:id", getRoom);
//GET ALL

router.get("/", getRooms);

export default router;
