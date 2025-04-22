import mongoose from 'mongoose';

const EmployerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
    experiences: [{ type: String }], // ✅ no required
    position: { type: String, required: true },

    skills: [{ type: String }],       // ✅ no required
    projects: [{ type: String }],
    softskills: [{ type: String }],
    education: [{ type: String }],
    achievements: [{ type: String }],

    gender: { type: String, required: true },
    nationality: { type: String, required: true },
    dob: { type: Date, required: true },
    language: { type: String, required: true },
    photo: { type: String }, // ✅ optional by default
}, {
    timestamps: true,
});

export default mongoose.models.Employer || mongoose.model("Employer", EmployerSchema);
