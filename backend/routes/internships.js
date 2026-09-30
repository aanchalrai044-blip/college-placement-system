import express from "express";
import Internship from "../models/Internship.js";

const router = express.Router();

// GET /api/internships -> sab internships laa ke do
router.get("/", async (req, res) => {
  const data = await Internship.find().sort({ createdAt: -1 });
  res.json(data);
});

// POST /api/internships -> nayi internship add karo
router.post("/", async (req, res) => {
  try {
    const newEntry = new Internship(req.body);
    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/internships/:id -> ek entry delete karo
router.delete("/:id", async (req, res) => {
  await Internship.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
