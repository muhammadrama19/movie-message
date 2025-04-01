import { prisma } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body
    console.log("Request Body:", body);

    const { movie_id, recipient, message } = body;

    // Validate input
    if (!movie_id || !recipient || !message) {
      console.error("Missing required fields:", { movie_id, recipient, message });
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Insert data into the messages table
    const data = await prisma.messages.create({
      data: {
        movie_id,
        receiver: recipient, // Ensure 'receiver' matches the column name in your Prisma schema
        message,
      },
    });

    console.log("Data inserted successfully:", data);

    return new Response(
      JSON.stringify({ message: "Message sent successfully", data }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", details: err.message }),
      { status: 500 }
    );
  }
}