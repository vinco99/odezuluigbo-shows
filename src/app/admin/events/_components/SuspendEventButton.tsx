"use client";

export default function SuspendEventButton({ id, disabled }: { id: string; disabled: boolean }) {
  async function suspend(status: string) {
    await fetch(
      `/api/admin/events/${id}/suspend`, 
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
      <button className="btn btn-outline btn-xs" onClick={() => suspend("SUSPENDED")}>
        Suspend
      </button>
  );
}
