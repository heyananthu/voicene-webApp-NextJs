// models/employer.js

import mongoose from 'mongoose';

const EmployerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
    experiences: [{ type: String, required: true }], // Array of experiences
    position: { type: String, required: true },
    skills: [{ type: String, required: true }], // Array of skills
    photo: { type: String }, // photo filename
}, {
    timestamps: true,
});

export default mongoose.models.Employer || mongoose.model("Employer", EmployerSchema);
