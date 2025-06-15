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

        if (photo && typeof photo.name === "string") {
            const bytes = await photo.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const fileName = `${Date.now()}-${photo.name}`;
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
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
}


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

