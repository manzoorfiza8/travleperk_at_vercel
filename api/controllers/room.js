import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room({
    ...req.body,
    hotelId: hotelId
  });

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom.roomNumbers },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    console.log(req.body);
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    await Hotel.findByIdAndUpdate(
      req.params.hotelId, 
      { $set: { rooms: updatedRoom.roomNumbers }},
      { new: true }
    );

    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};
export const updateRoomAvailability = async (req, res, next) => {
  console.log(req.body.dates)
  try {
    const res = await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    const id = await Room.findById(req.params.rid);
    const hid = id.hotelId
    const hostelId = hid.toString();
    await Hotel.findByIdAndUpdate(
      hostelId, 
      { $set: { rooms: id.roomNumbers }},
      { new: true }
    ).exec().then((data) => {
      if(data){
        console.log(data);
        res.status(200).json("Room status has been updated.");
      }
      else{
        next(err);
      }
    })
  } catch (err) {
    next(err);
  }
};
export const deleteRoom = async (req, res, next) => {
  const roomId = req.params.id;
  const hotelId = req.params.hotelid;

  try {
    const res = await Room.findByIdAndDelete(roomId);

    await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: res.roomNumbers } });

    res.status(200).json({ message: "Room has been deleted." });
  } catch (err) {
    next(err);
  }
};

export const deleteRooms = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
