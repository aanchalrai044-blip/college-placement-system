import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import internshipRoutes from "./routes/internships.js";
import placementRoutes from "./routes/placements.js";
import openingRoutes from "./routes/openings.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // JSON body padhne ke liye

// Teeno resource ke routes yaha connect ho rahe hain
app.use("/api/internships", internshipRoutes);
app.use("/api/placements", placementRoutes);
app.use("/api/openings", openingRoutes);

app.get("/", (req, res) => {
  res.send("College Placement System API is running");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
