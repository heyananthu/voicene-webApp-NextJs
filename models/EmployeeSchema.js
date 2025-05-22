import mongoose from 'mongoose';

// Define the subdocument schema for a project
const ProjectSchema = new mongoose.Schema({
    projectName: { type: String },
    client: { type: String },
    teamSize: { type: String },
    technology: { type: String },
    description: { type: String }
}, { _id: false }); // _id: false if you don't want an _id for each project subdoc

const EmployerSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    contact: { type: String },
    experiences: [{ type: String }],
    position: { type: String },
    totalexperience: { type: String },

    skills: [{ type: String }],
    projects: [ProjectSchema], // <-- Now an array of subdocuments
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
