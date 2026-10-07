"use client";

export default function EventReviewButtons({ id, disabled }: { id: string; disabled: boolean }) {
  async function approve(status: string) {
    await fetch(
      `/api/admin/events/${id}/approve`, 
      { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ status }) 
      }
    );

    window.location.reload();
  }

  async function reject(status: string) {
    await fetch(
      `/api/admin/events/${id}/reject`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      }
    );

    window.location.reload();
  }

  if (disabled) return null;

  return (
    <span style={{marginLeft: "4px"}}>
      <button className="btn btn-gold btn-xs" onClick={() => approve("APPROVED")} style={{margin: "6px"}}>Approve</button>
      <button className="btn btn-red btn-xs" onClick={() => reject("REJECTED")} >Reject</button>
    </span>
  );
}
