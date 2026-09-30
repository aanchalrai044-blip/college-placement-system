import mongoose from "mongoose";

const openingSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    role: { type: String, required: true },
    eligibility: { type: String }, // e.g. "TY students, 60% aggregate"
    description: { type: String },
    deadline: { type: String }, // simple text date, e.g. "2026-10-15"
  },
  { timestamps: true }
);

export default mongoose.model("Opening", openingSchema);
