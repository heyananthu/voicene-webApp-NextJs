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

        // Array fields
        const experiences = formData.getAll("experiences") || [];
        const skills = formData.getAll("skills") || [];
        const projects = formData.getAll("projects") || [];
        const softskills = formData.getAll("softskills") || [];
        const education = formData.getAll("education") || [];
        const achievements = formData.getAll("achievements") || [];

        // File handling (photo)
        const photo = formData.get("photo");
        let photoUrl = "";

        if (photo && photo.name) {
            const bytes = await photo.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const fileName = `${Date.now()}-${photo.name}`;
            const uploadDir = path.join(process.cwd(), "public/uploads");

            // Create the uploads folder if it doesn't exist
            if (!fs.existsSync(uploadDir)) {
                await mkdir(uploadDir, { recursive: true });
            }

            const filePath = path.join(uploadDir, fileName);
            await writeFile(filePath, buffer);
            photoUrl = fileName;
        }

        // Helper to safely parse date or return undefined
        function parseDate(value) {
            return value && value.trim() !== "" ? new Date(value) : undefined;
        }

        // Create and save employer
        const employer = new Employer({
            name,
            email,
            contact,
            experiences,
            position,
            totalexperience,
            skills,
            projects,
            softskills,
            education,
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
    }
}





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