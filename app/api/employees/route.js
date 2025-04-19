import Employer from "@/models/EmployeeSchema";
import connectDB from "@/lib/mongodb";
import multer from "multer";
import path from "path";
import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';

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

    // Run Multer middleware to handle the file upload
    const formData = await req.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const contact = formData.get("contact");
    const position = formData.get("position");

    // Parse array data
    const experiences = formData.getAll("experiences[]");
    const skills = formData.getAll("skills[]");

    // Handle photo upload
    const photo = formData.get("photo");
    let photoUrl = "";

    if (photo && photo.name) {
        const bytes = await photo.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = `${Date.now()}-${photo.name}`;
        const filePath = path.join(process.cwd(), "public/uploads", fileName);

        await writeFile(filePath, buffer);
        photoUrl = fileName; // just filename; you can construct full URL when needed
    }

    try {
        const employer = new Employer({
            name,
            email,
            contact,
            experiences,
            position,
            skills,
            photo: photoUrl,
        });

        await employer.save();
        return NextResponse.json({ success: true, employer }, { status: 201 });
    } catch (err) {
        console.error("Error creating employer:", err);

        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return NextResponse.json({ success: false, message: messages.join(', ') }, { status: 400 });
        }

        if (err.code === 11000) {
            return NextResponse.json({ success: false, message: `Duplicate field: ${JSON.stringify(err.keyValue)}` }, { status: 409 });
        }

        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
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

// PUT: Update an employer by ID
export async function PUT(req) {
    await connectDB();
    const { id } = req.nextUrl.searchParams;
    
    const formData = await req.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const contact = formData.get("contact");
    const position = formData.get("position");

    const experiences = formData.getAll("experiences[]");
    const skills = formData.getAll("skills[]");

    const photo = formData.get("photo");
    let photoUrl = "";

    if (photo && photo.name) {
        const bytes = await photo.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = `${Date.now()}-${photo.name}`;
        const filePath = path.join(process.cwd(), "public/uploads", fileName);

        await writeFile(filePath, buffer);
        photoUrl = fileName;
    }

    try {
        const employer = await Employer.findById(id);
        if (!employer) {
            return NextResponse.json({ success: false, message: 'Employer not found' }, { status: 404 });
        }

        employer.name = name || employer.name;
        employer.email = email || employer.email;
        employer.contact = contact || employer.contact;
        employer.position = position || employer.position;
        employer.skills = skills || employer.skills;
        employer.experiences = experiences || employer.experiences;
        employer.photo = photoUrl || employer.photo;

        await employer.save();
        return NextResponse.json({ success: true, employer }, { status: 200 });
    } catch (err) {
        console.error('Error updating employer:', err);
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
}


// DELETE: Delete an employer by ID
export async function DELETE(req) {
    await connectDB();
    const { id } = req.nextUrl.searchParams;
    try {
        const employer = await Employer.findByIdAndDelete(id);
        if (!employer) {
            return NextResponse.json({ success: false, message: 'Employer not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: 'Employer deleted successfully' }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: 'Error deleting employer' }, { status: 500 });
    }
}

