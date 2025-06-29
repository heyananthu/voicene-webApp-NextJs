<<<<<<< HEAD
import { db } from '@/lib/db';
import {
    employers,
    employerSkills,
    employerSoftskills,
    employerAchievements,
    employerEducation,
    employerProjects,
    employerExperiences,
} from '@/models/EmployeeSchema';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import fs from 'fs';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const formData = await req.formData();

        // 1. Handle photo upload
        const photo = formData.get("photo");
        let photoUrl = "";
=======
import Employer from "@/models/EmployeeSchema";
import connectDB from "@/lib/mongodb";
import multer from "multer";
import path from "path";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import fs from "fs";

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: './public/uploads', // Save the photo in the public/uploads directory
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

// Disable Next.js default body parser (for file upload)
export const config = {
    api: {
        bodyParser: false,  // This is necessary for Multer to work
    },
};

// Helper function to handle Multer middleware
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) return reject(result);
            return resolve(result);
        });
    });
}

// POST: Create a new employer

function parseDate(value) {
    return value && value.trim() !== "" ? new Date(value) : undefined;
}

export async function POST(req) {
    await connectDB();

    try {
        const formData = await req.formData();

        // Basic fields
        const name = formData.get("name");
        const email = formData.get("email");
        const contact = formData.get("contact");
        const position = formData.get("position");
        const totalexperience = formData.get("totalexperience");
        const gender = formData.get("gender");
        const nationality = formData.get("nationality");
        const dob = formData.get("dob");
        const language = formData.get("language");
        const doj = formData.get("doj");

        // Array fields (still arrays of strings)
        const skills = formData.getAll("skills") || [];
        const softskills = formData.getAll("softskills") || [];
        const achievements = formData.getAll("achievements") || [];

        // Parse projects JSON string into array of objects
        let projects = [];
        const projectsRaw = formData.get("projects");
        if (projectsRaw) {
            try {
                projects = JSON.parse(projectsRaw);
            } catch (e) {
                return NextResponse.json(
                    { success: false, message: "Invalid projects data format" },
                    { status: 400 }
                );
            }
        }

        // Parse education JSON string into array of objects
        let education = [];
        const educationRaw = formData.get("education");
        if (educationRaw) {
            try {
                education = JSON.parse(educationRaw);
            } catch (e) {
                return NextResponse.json(
                    { success: false, message: "Invalid education data format" },
                    { status: 400 }
                );
            }
        }

        // Parse experiences JSON string into array of objects
        let experiences = [];
        const experiencesRaw = formData.get("experiences");
        if (experiencesRaw) {
            try {
                experiences = JSON.parse(experiencesRaw);
            } catch (e) {
                return NextResponse.json(
                    { success: false, message: "Invalid experiences data format" },
                    { status: 400 }
                );
            }
        }

        // File handling (photo)
        const photo = formData.get("photo");
        let photoUrl = "";

>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f
        if (photo && photo.name) {
            const bytes = await photo.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const fileName = `${Date.now()}-${photo.name}`;
            const uploadDir = path.join(process.cwd(), "public/uploads");
<<<<<<< HEAD
            if (!fs.existsSync(uploadDir)) {
                await mkdir(uploadDir, { recursive: true });
            }
            await writeFile(path.join(uploadDir, fileName), buffer);
            photoUrl = fileName;
        }

        // 2. Main employer data
        const newEmployer = {
            name: formData.get("name"),
            email: formData.get("email"),
            contact: formData.get("contact"),
            position: formData.get("position"),
            totalexperience: formData.get("totalexperience"),
            dob: formData.get("dob") ? new Date(formData.get("dob")) : null,
            doj: formData.get("doj") ? new Date(formData.get("doj")) : null,
            gender: formData.get("gender"),
            nationality: formData.get("nationality"),
            language: formData.get("language"),
            photo: photoUrl,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const [insertedEmployer] = await db.insert(employers).values(newEmployer).returning();
        const employerId = insertedEmployer.id;

        // 3. Related fields
        const skills = formData.getAll("skills").filter(Boolean);
        const softskills = formData.getAll("softskills").filter(Boolean);
        const achievements = formData.getAll("achievements").filter(Boolean);
        const education = JSON.parse(formData.get("education") || "[]");
        const experiences = JSON.parse(formData.get("experiences") || "[]");
        const projectsRaw = JSON.parse(formData.get("projects") || "[]");

        const projects = projectsRaw.map(p => ({
            employerId,
            projectName: p.projectName,
            client: p.client,
            teamSize: p.teamSize,
            technology: p.technology,
            description: Array.isArray(p.description)
                ? p.description.map(d => d.trim()).filter(Boolean).join("|||")
                : typeof p.description === "string"
                    ? p.description
                    : "",
        }));


        // 4. Insert related data
        if (skills.length)
            await db.insert(employerSkills).values(skills.map(skill => ({ employerId, skill })));

        if (softskills.length)
            await db.insert(employerSoftskills).values(softskills.map(softskill => ({ employerId, softskill })));

        if (achievements.length)
            await db.insert(employerAchievements).values(achievements.map(achievement => ({ employerId, achievement })));

        if (education.length)
            await db.insert(employerEducation).values(
                education.map(e => ({
                    employerId,
                    school: e.school,
                    course: e.course,
                    year: e.year,
                }))
            );

        if (experiences.length)
            await db.insert(employerExperiences).values(
                experiences.map(exp => ({
                    employerId,
                    company: exp.company,
                    jobRole: exp.jobRole,
                    jobDescription: exp.jobDescription,
                }))
            );

        if (projects.length)
            await db.insert(employerProjects).values(projects); // 👍 Cleaned description field

        return NextResponse.json({ success: true, employer: insertedEmployer }, { status: 201 });
    } catch (err) {
        console.error("POST Error:", err);
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
=======

            // Create the uploads folder if it doesn't exist
            if (!fs.existsSync(uploadDir)) {
                await mkdir(uploadDir, { recursive: true });
            }

            const filePath = path.join(uploadDir, fileName);
            await writeFile(filePath, buffer);
            photoUrl = fileName;
        }

        // Create and save employer
        const employer = new Employer({
            name,
            email,
            contact,
            experiences, // now an array of objects
            position,
            totalexperience,
            skills,
            projects, // array of objects
            softskills,
            education, // now an array of objects
            achievements,
            gender,
            nationality,
            dob: parseDate(dob),
            language,
            doj: parseDate(doj),
            photo: photoUrl,
        });

        await employer.save();

        return NextResponse.json({ success: true, employer }, { status: 201 });

    } catch (err) {
        console.error("Error creating employer:", err);

        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map(val => val.message);
            return NextResponse.json(
                { success: false, message: messages.join(", ") },
                { status: 400 }
            );
        }

        if (err.code === 11000) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Duplicate field: ${JSON.stringify(err.keyValue)}`,
                },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { success: false, message: err.message },
            { status: 500 }
        );
>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f
    }
}


<<<<<<< HEAD
export async function GET() {
    try {
        const employerRows = await db.select().from(employers);

        // Fetch related data
        const [skillsRows, softskillsRows, achievementsRows, educationRows, projectsRows, experiencesRows] = await Promise.all([
            db.select().from(employerSkills),
            db.select().from(employerSoftskills),
            db.select().from(employerAchievements),
            db.select().from(employerEducation),
            db.select().from(employerProjects),
            db.select().from(employerExperiences),
        ]);

        // Combine all into full employer profiles
        const fullEmployers = employerRows.map(emp => ({
            ...emp,
            skills: skillsRows.filter(s => s.employerId === emp.id).map(s => s.skill),
            softskills: softskillsRows.filter(s => s.employerId === emp.id).map(s => s.softskill),
            achievements: achievementsRows.filter(a => a.employerId === emp.id).map(a => a.achievement),
            education: educationRows.filter(e => e.employerId === emp.id),
            projects: projectsRows.filter(p => p.employerId === emp.id),
            experiences: experiencesRows.filter(x => x.employerId === emp.id),
        }));

        return NextResponse.json({ success: true, employers: fullEmployers }, { status: 200 });
    } catch (err) {
        console.error("GET Error:", err);
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
}

=======


// GET: Fetch all employers
export async function GET() {
    await connectDB();
    try {
        const employers = await Employer.find();
        return NextResponse.json({ success: true, employers }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
}
>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f
