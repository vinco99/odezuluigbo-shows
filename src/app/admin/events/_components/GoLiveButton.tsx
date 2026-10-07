"use client";

export default function GoLiveButton({ id, disabled }: { id: string; disabled: boolean }) {
  async function goLive(status: string) {
    await fetch(
      `/api/admin/events/${id}/go-live`, 
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
      <button className="btn btn-red btn-xs" style={{ marginLeft: "4px" }} onClick={() => goLive("LIVE")}>
        Go Live
      </button>
  );
}
