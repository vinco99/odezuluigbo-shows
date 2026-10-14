"use client";

export function UnsuspendEventButton({ id }: { id: string; }) {
  async function unsuspend(status: string, isVotingOpen: boolean) {
    await fetch(
      `/api/admin/events/${id}/unsuspend`, 
      { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ status, isVotingOpen }) 
      }
    );

    window.location.reload();
  }

  return (
      <button className="btn btn-outline btn-xs" onClick={() => unsuspend("LIVE", true)}>
        Unsuspend
      </button>
  );
}
