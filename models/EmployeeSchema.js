import mongoose from 'mongoose';

// Project subdocument schema
const ProjectSchema = new mongoose.Schema({
    projectName: { type: String },
    client: { type: String },
    teamSize: { type: String },
    technology: { type: String },
    description: [{ type: String }]
}, { _id: false });

// Education subdocument schema
const EducationSchema = new mongoose.Schema({
    school: { type: String },
    course: { type: String },
    year: { type: String }
}, { _id: false });

// Experience subdocument schema
const ExperienceSchema = new mongoose.Schema({
    company: { type: String },
    jobRole: { type: String },
    jobDescription: { type: String }
}, { _id: false });

// Main Employer schema
const EmployerSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    contact: { type: String },

    // Now an array of objects
    experiences: [ExperienceSchema],

    position: { type: String },
    totalexperience: { type: String },

    skills: [{ type: String }],
    projects: [ProjectSchema],
    softskills: [{ type: String }],

    // Now an array of objects
    education: [EducationSchema],

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
