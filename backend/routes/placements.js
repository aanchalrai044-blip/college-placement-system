import express from "express";
import Placement from "../models/Placement.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await Placement.find().sort({ createdAt: -1 });
  res.json(data);
});

router.post("/", async (req, res) => {
  try {
    const newEntry = new Placement(req.body);
    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  await Placement.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
