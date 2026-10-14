"use client";

export function SuspendEventButton({ id }: { id: string; }) {
  async function suspend(status: string, isVotingOpen: boolean) {
    await fetch(
      `/api/admin/events/${id}/suspend`, 
      { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ status, isVotingOpen }) 
      }
    );

    window.location.reload();
  }

  return (
      <button className="btn btn-outline btn-xs" onClick={() => suspend("SUSPENDED", false)}>
        Suspend
      </button>
  );
}
