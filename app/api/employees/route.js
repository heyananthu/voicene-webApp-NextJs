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
        if (photo && photo.name) {
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
    }
}


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

