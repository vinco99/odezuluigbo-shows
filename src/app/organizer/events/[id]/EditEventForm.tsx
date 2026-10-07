"use client";

import { useState } from "react";

export default function EditEventForm({ event }: { event: { id: string; title: string; description: string; registrationFee: number; votingFee: number; registrationStart: string | null; registrationEnd: string | null; eventDate: string | null; isVotingOpen: boolean } }) {
  const [message, setMessage] = useState("");
  async function submit(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    const form = new FormData(formEvent.currentTarget);
    const body = Object.fromEntries(form);
    const response = await fetch(
      `/api/events/${event.id}`, 
      { 
        method: "PATCH", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ ...body, isVotingOpen: body.isVotingOpen === "on" }) 
      }
    );
    setMessage(response.ok ? "Event updated." : "Unable to update event.");
  }
  const inputDate = (date: string | null) => date ? new Date(date).toISOString().slice(0, 16) : "";

  return (
    <div >
      <div className="container" style={{marginBottom: "40px", marginTop: "40px",textAlign: "center"}}>
        <span className="section-badge">Workspace</span>
        <h2 className="section-title">Edit and Update {event.title}</h2>
      </div>
      <div className="form-section">
        <div className="form-box">
          <form onSubmit={submit}>
            <div className="form-group">
              <label>Event Title</label>
              <input name="title" defaultValue={event.title} />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea name="description" defaultValue={event.description} />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Registration Fee</label>
                <input name="registrationFee" type="number" min="0" defaultValue={event.registrationFee} />
              </div>
              <div className="form-group">
                <label>Voting Fee</label>
                <input name="votingFee" type="number" min="0" defaultValue={event.votingFee} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Registration starts</label>
                <input name="registrationStart" type="datetime-local" defaultValue={inputDate(event.registrationStart)} />
              </div>
              <div className="form-group">
                <label>Registration ends</label>
                <input name="registrationEnd" type="datetime-local" defaultValue={inputDate(event.registrationEnd)} />
              </div>
            </div>

            <div className="form-group">
              <label>Event date</label>
              <input name="eventDate" type="datetime-local" defaultValue={inputDate(event.eventDate)} />
            </div>

            <div className="form-group">
              <label >
                <input name="isVotingOpen" type="checkbox" defaultChecked={event.isVotingOpen} className="auth-check"/> Voting is open
              </label>
            </div>
            
            <button className="btn btn-gold btn-full">Save</button>
            {message && <p>{message}</p>}
          </form>
        </div>
      </div>
    </div>
  )

}
