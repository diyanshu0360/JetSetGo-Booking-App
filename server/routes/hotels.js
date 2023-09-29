import express from "express";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const saveHotel = await newHotel.save();
    res.status(200).json(saveHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel Deleted successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET
router.get("/find/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL
router.get("/", async (req, res) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({ ...others, cheapestPrice: { $gt: min | 1, $lt: max || 999 },}).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json(error);
  }
});

// CITY COUNT
router.get("/countByCity", async (req, res) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
});

// TYPE COUNT
router.get("/countByType", async (req, res) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "Apartment" });
    const resortCount = await Hotel.countDocuments({ type: "Resort" });
    const villaCount = await Hotel.countDocuments({ type: "Villa" });
    const cabinCount = await Hotel.countDocuments({ type: "Cabin" });
    
    res.status(200).json([
      { type: "Hotel", count: hotelCount },
      { type: "Apartments", count: apartmentCount },
      { type: "Resort", count: resortCount },
      { type: "Villa", count: villaCount },
      { type: "Cabin", count: cabinCount },
    ]);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ROOMS NUMBER
router.get("/room/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((roomid) => {
        return Room.findById(roomid);
      })
    );
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
