import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Employer from "@/models/EmployeeSchema";

// Disable body parser for file upload
export const config = {
    api: {
        bodyParser: false,
    },
};

export async function PUT(req, { params }) {
    await connectDB();
    const id = params.id;

    try {
        const formData = await req.formData();

        const name = formData.get("name");
        const email = formData.get("email");
        const contact = formData.get("contact");
        const position = formData.get("position");
        const dob = formData.get("dob");
        const gender = formData.get("gender");
        const nationality = formData.get("nationality");
        const language = formData.get("language");
        const doj = formData.get("doj");

        const experiences = formData.getAll("experiences");
        const skills = formData.getAll("skills");
        const education = formData.getAll("education");
        const softskills = formData.getAll("softskills");
        const projects = formData.getAll("projects");
        const achievements = formData.getAll("achievements");


        const photo = formData.get("photo");
        let photoUrl = "";

        if (photo && typeof photo.name === "string") {
            const bytes = await photo.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const fileName = `${Date.now()}-${photo.name}`;
            const filePath = path.join(process.cwd(), "public", "uploads", fileName);
            await writeFile(filePath, buffer);
            photoUrl = fileName;
        }

        const employer = await Employer.findById(id);
        if (!employer) {
            return NextResponse.json({ success: false, message: "Employer not found" }, { status: 404 });
        }

        employer.name = name || employer.name;
        employer.email = email || employer.email;
        employer.contact = contact || employer.contact;
        employer.position = position || employer.position;
        employer.dob = dob || employer.dob;
        employer.gender = gender || employer.gender;
        employer.nationality = nationality || employer.nationality;
        employer.language = language || employer.language;
        employer.doj = doj || employer.doj;


        employer.skills = skills.length ? skills : employer.skills;
        employer.experiences = experiences.length ? experiences : employer.experiences;
        employer.education = education.length ? education : employer.education;
        employer.softskills = softskills.length ? softskills : employer.softskills;
        employer.projects = projects.length ? projects : employer.projects;
        employer.achievements = achievements.length ? achievements : employer.achievements;
        if (photoUrl) {
            employer.photo = photoUrl;
        }
        await employer.save();

        return NextResponse.json({ success: true, updatedEmployer: employer }, { status: 200 });
    } catch (err) {
        console.error("Error updating employer:", err);
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
}



export async function DELETE(req, { params }) {
    await connectDB();
    try {
        const { id } = params;  // Get the id from the URL
        console.log("userid:", id);

        if (id) {
            const employer = await Employer.findByIdAndDelete(id);
            if (!employer) {
                return NextResponse.json({ msg: "Employer not found" }, { status: 404 });
            }
            return NextResponse.json({ msg: "Employer deleted" }, { status: 200 });
        }

        return NextResponse.json({ msg: "User not selected" }, { status: 404 });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json({ error: "Error while deleting the user details" }, { status: 500 });
    }
}




