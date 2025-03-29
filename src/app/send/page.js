"use client";
import { useState } from "react";
import { supabase } from "@/lib/db";

export default function SendMenfess() {
    const [movie, setMovie] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await supabase.from("messages").insert([{ movie, message }]);

        if (error) {
            console.error("Error sending menfess:", error.message);
        } else {
            alert("Menfess sent successfully!");
            setMovie("");
            setMessage("");
        }
    };

    return (
        <div>
            <h1>Send Movie Menfess</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Movie Title" value={movie} onChange={(e) => setMovie(e.target.value)} required />
                <textarea placeholder="Your Anonymous Message" value={message} onChange={(e) => setMessage(e.target.value)} required />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}
