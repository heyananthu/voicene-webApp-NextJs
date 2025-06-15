<<<<<<< HEAD
import { db } from "@/lib/db";
import {
    employers,
    employerSkills,
    employerSoftskills,
    employerAchievements,
    employerEducation,
    employerProjects,
    employerExperiences,
} from "@/models/EmployeeSchema";
import { eq } from "drizzle-orm";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    try {
        const id = parseInt(params.id);
        if (isNaN(id)) {
            return NextResponse.json({ success: false, message: "Invalid ID" }, { status: 400 });
        }

        const formData = await req.formData();

        // Handle Photo Upload
        const photo = formData.get("photo");
        let photoUrl = null;
=======
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

function parseDate(value) {
    return value && value.trim() !== "" ? new Date(value) : undefined;
}

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

        // Array fields (arrays of strings)
        const skills = formData.getAll("skills");
        const softskills = formData.getAll("softskills");
        const achievements = formData.getAll("achievements");

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

        // File handling (photo)
        const photo = formData.get("photo");
        let photoUrl = "";
>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f

        if (photo && typeof photo.name === "string") {
            const bytes = await photo.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const fileName = `${Date.now()}-${photo.name}`;
<<<<<<< HEAD
            const uploadDir = path.join(process.cwd(), "public/uploads");

            if (!fs.existsSync(uploadDir)) {
                await mkdir(uploadDir, { recursive: true });
            }

            await writeFile(path.join(uploadDir, fileName), buffer);
            photoUrl = fileName;
        }

        // Employer Main Info
        const updatedEmployer = {
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
            updatedAt: new Date(),
        };

        if (photoUrl) updatedEmployer.photo = photoUrl;

        // Update main row
        await db.update(employers).set(updatedEmployer).where(eq(employers.id, id));

        // Delete old related data
        await db.delete(employerSkills).where(eq(employerSkills.employerId, id));
        await db.delete(employerSoftskills).where(eq(employerSoftskills.employerId, id));
        await db.delete(employerAchievements).where(eq(employerAchievements.employerId, id));
        await db.delete(employerEducation).where(eq(employerEducation.employerId, id));
        await db.delete(employerProjects).where(eq(employerProjects.employerId, id));
        await db.delete(employerExperiences).where(eq(employerExperiences.employerId, id));

        // Parse fields from form
        const safeJSON = (key) => {
            try {
                return JSON.parse(formData.get(key) || "[]");
            } catch {
                return [];
            }
        };

        const skills = formData.getAll("skills").filter(Boolean);
        const softskills = formData.getAll("softskills").filter(Boolean);
        const achievements = formData.getAll("achievements").filter(Boolean);
        const education = safeJSON("education");
        const projects = safeJSON("projects");
        const experiences = safeJSON("experiences");

        // Re-insert related data
        if (skills.length)
            await db.insert(employerSkills).values(skills.map(skill => ({ employerId: id, skill })));

        if (softskills.length)
            await db.insert(employerSoftskills).values(softskills.map(s => ({ employerId: id, softskill: s })));

        if (achievements.length)
            await db.insert(employerAchievements).values(achievements.map(a => ({ employerId: id, achievement: a })));

        if (education.length)
            await db.insert(employerEducation).values(
                education.map(e => ({ employerId: id, school: e.school, course: e.course, year: e.year }))
            );

        if (projects.length)
            await db.insert(employerProjects).values(
                projects.map(p => ({
                    employerId: id,
                    projectName: p.projectName,
                    client: p.client,
                    teamSize: p.teamSize,
                    technology: p.technology,
                    description: Array.isArray(p.description) ? p.description.join("|||") : p.description,
                }))
            );

        if (experiences.length)
            await db.insert(employerExperiences).values(
                experiences.map(x => ({
                    employerId: id,
                    company: x.company,
                    jobRole: x.jobRole,
                    jobDescription: x.jobDescription,
                }))
            );

        // Get updated employer from db
        const [updated] = await db.select().from(employers).where(eq(employers.id, id));

        // Fetch all related data
        const [skillsResult, softskillsResult, achievementsResult, educationResult, projectsResult, experiencesResult] = await Promise.all([
            db.select().from(employerSkills).where(eq(employerSkills.employerId, id)),
            db.select().from(employerSoftskills).where(eq(employerSoftskills.employerId, id)),
            db.select().from(employerAchievements).where(eq(employerAchievements.employerId, id)),
            db.select().from(employerEducation).where(eq(employerEducation.employerId, id)),
            db.select().from(employerProjects).where(eq(employerProjects.employerId, id)),
            db.select().from(employerExperiences).where(eq(employerExperiences.employerId, id)),
        ]);

        const formattedProjects = projectsResult.map(p => ({
            ...p,
            description: typeof p.description === "string" ? p.description.split(",").map(d => d.trim()).filter(Boolean) : [],
        }));

        return NextResponse.json({
            success: true,
            message: "Employer updated.",
            updatedEmployer: {
                ...updated,
                skills: skillsResult.map(s => s.skill),
                softskills: softskillsResult.map(s => s.softskill),
                achievements: achievementsResult.map(a => a.achievement),
                education: educationResult,
                projects: formattedProjects,
                experiences: experiencesResult,
            },
        }, { status: 200 });

    } catch (err) {
        console.error("❌ PUT Error:", err);
=======
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
        employer.dob = dob !== null ? parseDate(dob) : employer.dob;
        employer.gender = gender !== null ? gender : employer.gender;
        employer.nationality = nationality !== null ? nationality : employer.nationality;
        employer.language = language !== null ? language : employer.language;
        employer.doj = doj !== null ? parseDate(doj) : employer.doj;

        employer.skills = skills ? skills.filter(Boolean) : [];
        employer.softskills = softskills ? softskills.filter(Boolean) : [];
        employer.achievements = achievements ? achievements.filter(Boolean) : [];

        employer.education = education;
        employer.experiences = experiences;
        employer.projects = projects;

        if (photoUrl) {
            employer.photo = photoUrl;
        }
        await employer.save();

        return NextResponse.json({ success: true, updatedEmployer: employer }, { status: 200 });
    } catch (err) {
        console.error("Error updating employer:", err);
>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
}


<<<<<<< HEAD
export async function DELETE(req, { params }) {
    try {
        const id = parseInt(params.id);

        // Step 1: Validate ID
        if (isNaN(id)) {
            console.error("❌ Invalid ID passed to DELETE:", params.id);
            return NextResponse.json({ success: false, message: "Invalid employer ID" }, { status: 400 });
        }

        console.log("🗑️ Starting DELETE for employer ID:", id);

        // Step 2: Delete from all related tables (child rows first)
        const deletions = [
            { table: employerSkills, label: "employerSkills" },
            { table: employerSoftskills, label: "employerSoftskills" },
            { table: employerAchievements, label: "employerAchievements" },
            { table: employerEducation, label: "employerEducation" },
            { table: employerProjects, label: "employerProjects" },
            { table: employerExperiences, label: "employerExperiences" },
        ];

        for (const { table, label } of deletions) {
            await db.delete(table).where(eq(table.employerId, id));
            console.log(`✅ Deleted from ${label}`);
        }

        // Step 3: Delete main employer row
        await db.delete(employers).where(eq(employers.id, id));
        console.log("✅ Deleted from employers");

        return NextResponse.json({ success: true, message: "Employer deleted successfully." }, { status: 200 });

    } catch (err) {
        console.error("❌ DELETE Error:", err);
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
}

=======

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




>>>>>>> 74a634e42efaa1fa9d625c35472eb24ba2e7e00f
