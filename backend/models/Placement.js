import mongoose from "mongoose";

const placementSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    company: { type: String, required: true },
    role: { type: String, required: true },
    package: { type: String }, // e.g. "6 LPA"
  },
  { timestamps: true }
);

export default mongoose.model("Placement", placementSchema);
