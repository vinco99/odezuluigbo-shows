"use client";

import { useState } from "react";

export default function ReviewButtons({ id}: { id: string}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function review(status: "APPROVED" | "REJECTED") {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/admin/organizers/${id}`, 
        { 
          method: "POST", 
          headers: { 
            "Content-Type": "application/json" 
          }, 
          body: JSON.stringify({ status }) 
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
    <button className="new-btn new-btn-red review-button" id="reject-button" onClick={() => review("REJECTED")}>
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5.5 5.5 9 9m0-9-9 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
      Reject
    </button>
    <button className="new-btn new-btn-gold review-button" id="accept-button" onClick={() => review("APPROVED")}>
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m4.5 10.2 3.7 3.6 7.3-7.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      Accept
    </button>
    </>
  );
}
