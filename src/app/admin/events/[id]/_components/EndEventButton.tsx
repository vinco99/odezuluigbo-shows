"use client";

export function EndEventButton({ id }: { id: string;}) {
  async function endEvent(status: string, isVotingOpen: boolean) {
    await fetch(
      `/api/admin/events/${id}/end`, 
      { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ status, isVotingOpen }) 
      }
    );

    window.location.reload();
  }

  return (
      <button className="btn btn-red btn-xs" style={{ marginLeft: "4px" }} onClick={() => endEvent("COMPLETED", true)}>
        END EVENT
      </button>
  );
}
