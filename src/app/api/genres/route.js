import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
    
        await prisma.$queryRaw`SELECT 1`; 
      
 
        const testMovie = await prisma.movies.findFirst({ select: { id: true } });

        if (!testMovie) {
            return NextResponse.json({ message: "No movies found" }, { status: 404 });
        }

        const genres = await prisma.genres.findMany({
            select: { id: true, name: true }
        });

        return NextResponse.json(genres, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
    }
}
