import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./models/EmployeeSchema.js",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: "postgresql://neondb_owner:npg_09tmoWvlEnNg@ep-royal-boat-abkkf9qu-pooler.eu-west-2.aws.neon.tech/Voicene_Staffing?sslmode=require",
    },
});
