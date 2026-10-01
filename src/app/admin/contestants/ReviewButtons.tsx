"use client";

export default function ReviewButtons({ id }: { id: string }) {
    async function review(status: "APPROVED" | "REJECTED") {
        const response = await fetch(
            `/api/admin/contestants/${id}`, 
            { 
                method: "PATCH", 
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify({ status }) 
            }
        );
        if (response.ok) 
            window.location.reload();
    }
    return 
        <div className="flex gap-3 mt-4">
            <button onClick={() => review("APPROVED")} className="bg-green-600 text-white px-4 py-2">Accept</button>
            <button onClick={() => review("REJECTED")} className="bg-red-600 text-white px-4 py-2">Reject</button>
        </div>;
}
