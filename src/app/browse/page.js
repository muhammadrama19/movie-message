"use client";
import { useEffect, useState } from "react";

export default function BrowseMenfess() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch("/api/movies")
            .then((res) => res.json())
            .then((data) => setMessages(data))
            .catch((error) => console.error("Error fetching menfess:", error));
    }, []);

    return (
        <div>
            <h1>Browse Menfess</h1>
            <ul>
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <li key={index}>
                            <strong>{msg.movie}</strong>: {msg.message}
                        </li>
                    ))
                ) : (
                    <p>No menfess found.</p>
                )}
            </ul>
        </div>
    );
}
