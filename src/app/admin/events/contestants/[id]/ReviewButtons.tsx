"use client";

import { useState } from "react";

export default function ReviewButtons({ id }: { id: string }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function review(status: "APPROVED" | "REJECTED") {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                `/api/admin/contestants/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Unable to review application");
            }

            window.location.assign("/admin/events");

        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong"
            );
            setLoading(false);
        }
    }

    return (
        <>
            {error && <p className="text-red-500">{error}</p>}

            <button
                className="new-btn new-btn-red review-button"
                id="reject-button"
                disabled={loading}
                onClick={() => review("REJECTED")}
            >
                Reject
            </button>

            <button
                className="new-btn new-btn-gold review-button"
                id="accept-button"
                disabled={loading}
                onClick={() => review("APPROVED")}
            >
                Accept
            </button>
        </>
    );
}