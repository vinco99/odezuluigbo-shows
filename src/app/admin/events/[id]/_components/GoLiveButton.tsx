"use client";

export function GoLiveButton({ id }: { id: string;}) {
  async function goLive(status: string, isVotingOpen: boolean) {
    await fetch(
      `/api/admin/events/${id}/go-live`, 
      { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ status, isVotingOpen }) 
      }
    );

    window.location.reload();
  }

  return (
      <button className="btn btn-red btn-xs" style={{ marginLeft: "4px" }} onClick={() => goLive("LIVE", true)}>
        Go Live
      </button>
  );
}
