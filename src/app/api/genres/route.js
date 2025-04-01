import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
    
        await prisma.$queryRaw`SELECT 1`; 
        console.log("✅ Prisma is connected successfully!");

       
        const testMovie = await prisma.movies.findFirst({ select: { id: true } });

        if (!testMovie) {
            console.log("⚠️ No movies found in the database.");
            return NextResponse.json({ message: "No movies found" }, { status: 404 });
        }

        // 📌 Fetch all genres
        const genres = await prisma.genres.findMany({
            select: { id: true, name: true }
        });

        console.log("✅ Fetched genres:", genres);

        return NextResponse.json(genres, { status: 200 });

    } catch (error) {
        console.error("❌ Error connecting to database:", error);
        return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
    }
}
