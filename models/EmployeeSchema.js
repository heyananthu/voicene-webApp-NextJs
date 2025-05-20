import mongoose from 'mongoose';

const EmployerSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },  // email is still unique, but not required
    contact: { type: String },
    experiences: [{ type: String }],
    position: { type: String },
    totalexperience: { type: String },

    skills: [{ type: String }],
    projects: [{ type: String }],
    softskills: [{ type: String }],
    education: [{ type: String }],
    achievements: [{ type: String }],

    gender: { type: String },
    nationality: { type: String },
    dob: { type: Date },
    language: { type: String },
    doj: { type: Date },
    photo: { type: String },
}, {
    timestamps: true,
});

export default mongoose.models.Employer || mongoose.model("Employer", EmployerSchema);
