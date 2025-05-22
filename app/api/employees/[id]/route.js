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
        const totalexperience = formData.get("totalexperience");
        const dob = formData.get("dob");
        const gender = formData.get("gender");
        const nationality = formData.get("nationality");
        const language = formData.get("language");
        const doj = formData.get("doj");

        const experiences = formData.getAll("experiences");
        const skills = formData.getAll("skills");
        const education = formData.getAll("education");
        const softskills = formData.getAll("softskills");
        const achievements = formData.getAll("achievements");

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

        employer.name = name !== null ? name : employer.name;
        employer.email = email !== null ? email : employer.email;
        employer.contact = contact !== null ? contact : employer.contact;
        employer.position = position !== null ? position : employer.position;
        employer.totalexperience = totalexperience !== null ? totalexperience : employer.totalexperience;
        employer.dob = dob !== null ? dob : employer.dob;
        employer.gender = gender !== null ? gender : employer.gender;
        employer.nationality = nationality !== null ? nationality : employer.nationality;
        employer.language = language !== null ? language : employer.language;
        employer.doj = doj !== null ? doj : employer.doj;

        // For arrays, filter out empty strings and set to [] if empty
        employer.skills = skills ? skills.filter(Boolean) : [];
        employer.experiences = experiences ? experiences.filter(Boolean) : [];
        employer.education = education ? education.filter(Boolean) : [];
        employer.softskills = softskills ? softskills.filter(Boolean) : [];
        employer.achievements = achievements ? achievements.filter(Boolean) : [];
        employer.projects = projects; // <-- Now an array of objects

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




