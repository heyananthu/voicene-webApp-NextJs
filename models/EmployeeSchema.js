import {
    pgTable,
    serial,
    text,
    varchar,
    integer,
    date,
    timestamp,
    primaryKey,
    foreignKey,
} from 'drizzle-orm/pg-core';

// 1. Main Employer Table
export const employers = pgTable('employers', {
    id: serial('id').primaryKey(),
    name: text('name'),
    email: text('email').notNull().unique(),
    contact: text('contact'),
    position: text('position'),
    totalexperience: text('totalexperience'),
    gender: text('gender'),
    nationality: text('nationality'),
    dob: date('dob'),
    language: text('language'),
    doj: date('doj'),
    photo: text('photo'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// 2. Skills, Softskills, Achievements (each row = one item)
export const employerSkills = pgTable('employer_skills', {
    id: serial('id').primaryKey(),
    employerId: integer('employer_id').references(() => employers.id),
    skill: text('skill'),
});

export const employerSoftskills = pgTable('employer_softskills', {
    id: serial('id').primaryKey(),
    employerId: integer('employer_id').references(() => employers.id),
    softskill: text('softskill'),
});

export const employerAchievements = pgTable('employer_achievements', {
    id: serial('id').primaryKey(),
    employerId: integer('employer_id').references(() => employers.id),
    achievement: text('achievement'),
});

// 3. Experiences
export const employerExperiences = pgTable('employer_experiences', {
    id: serial('id').primaryKey(),
    employerId: integer('employer_id').references(() => employers.id),
    company: text('company'),
    jobRole: text('job_role'),
    jobDescription: text('job_description'),
});

// 4. Education
export const employerEducation = pgTable('employer_education', {
    id: serial('id').primaryKey(),
    employerId: integer('employer_id').references(() => employers.id),
    school: text('school'),
    course: text('course'),
    year: text('year'),
});

// 5. Projects (with array field for description)
export const employerProjects = pgTable('employer_projects', {
    id: serial('id').primaryKey(),
    employerId: integer('employer_id').references(() => employers.id),
    projectName: text('project_name'),
    client: text('client'),
    teamSize: text('team_size'),
    technology: text('technology'),
    description: text('description'), // store as comma-separated or use join table
});
