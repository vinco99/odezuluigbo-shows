"use client";

import { useState } from "react";


export default function PeopleForm({ eventId }: { eventId: string }) {
  const [type, setType] = useState<"judge" | "sponsor">("judge");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch(
      `/api/events/${eventId}/people`, 
      { 
        method: "POST", headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ type, ...Object.fromEntries(form) }) 
      }
    );
    setMessage(response.ok ? "Submitted for admin approval." : "Unable to submit.");
    if (response.ok) 
      event.currentTarget.reset();
  }

  return (

    <div>
      <div className="container" style={{marginBottom: "40px", marginTop: "40px", textAlign: "center"}}>
        <h2 className="section-title">Update Judges and Sponsors</h2>
      </div>
      <div className="form-section">
        <div className="form-box">
          <form onSubmit={submit}>
            <div className="form-group">
            <select value={type} onChange={(event) => setType(event.target.value as "judge" | "sponsor")}>
              <option value="judge">Judge</option>
              <option value="sponsor">Sponsor</option>
            </select>
            </div>
            <div className="form-group">
            <input name="name" required placeholder="Name" />
            </div>
            <div className="form-group">
              <input name="title" placeholder="Judge title" />
            </div>
            
            <div className="form-group">
              <input name="website" placeholder="Sponsor website" />
            </div>
            
            <div className="form-group">
              <input name="image" placeholder="Image URL for development" />
            </div>
            
            <button className="btn btn-gold btn-full">Submit for approval</button>
            {message && 
              <p>{message}</p>
            }
          </form>
        </div>
      </div>
    </div>
    
  )

}
