import mongoose from "mongoose";

// Har internship entry mein ye fields honge
const internshipSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    year: { type: String, enum: ["FY", "SY", "TY"], required: true },
    company: { type: String, required: true },
    role: { type: String, required: true },
    duration: { type: String }, // e.g. "2 months"
    stipend: { type: String }, // e.g. "10000" or "Unpaid"
  },
  { timestamps: true } // ye automatically createdAt, updatedAt add kar dega
);

export default mongoose.model("Internship", internshipSchema);
