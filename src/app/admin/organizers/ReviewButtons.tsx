"use client";

export default function ReviewButtons({ id, disabled }: { id: string; disabled: boolean }) {
  async function review(status: "APPROVED" | "REJECTED") {
    await fetch(`/api/admin/organizers/${id}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    window.location.reload();
  }
  if (disabled) return null;
  return <div className="flex gap-3 mt-4"><button onClick={() => review("APPROVED")} className="bg-green-600 text-white px-4 py-2">Accept</button><button onClick={() => review("REJECTED")} className="bg-red-600 text-white px-4 py-2">Reject</button></div>;
}
