import Link from "next/link";

type EventRow = { 
    id: string; 
    title: string; 
    type: string; 
    status: string; 
    organizer: { name: string }; 
    _count?: { contestants: number } 
};

type EventStatus = "PENDING" | "APPROVED" | "LIVE" | "REJECTED" | "COMPLETED" | "SUSPENDED";

const STATUS_CONFIG: Record<EventStatus, { label: string; className: string }> = {
  PENDING: {
    label: "Draft",
    className: "bg-yellow-100 text-yellow-800",
  },
  APPROVED: {
    label: "Approved",
    className: "bg-green-100 text-green-800",
  },
  LIVE: {
    label: "Approved",
    className: "bg-green-100 text-green-800",
  },
  REJECTED: {
    label: "Rejected",
    className: "bg-red-100 text-red-800",
  },
  COMPLETED: {
    label: "Suspended",
    className: "bg-gray-100 text-gray-800"
  },
  SUSPENDED: {
    label: "Cancelled",
    className: "bg-gray-100 text-gray-800",
  },
};

export function EventsTable({ events }: { events: EventRow[] }) {
    return (
            <div className="form-box" style={{ overflowX: "auto", marginBottom: "24px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem", minWidth: "640px" }}>
                    <thead>
                        <tr style={{ borderBottom: "1px solid var(--w10)", textAlign: "left", color: "var(--gold)" }}>
                            <th style={{ padding: "10px" }}>Event</th>
                            <th style={{ padding: "10px" }}>Category</th>
                            <th style={{ padding: "10px" }}>Organizer</th>
                            <th style={{ padding: "10px" }}>Status</th>
                            <th style={{ padding: "10px" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => 
                            <tr key={event.id} style={{ borderBottom: "1px solid var(--w10)" }}>
                                <td style={{ padding: "10px" }}>{event.title}</td>
                                <td style={{ padding: "10px" }}>{event.type.replaceAll("_", " ")}</td>
                                <td style={{ padding: "10px" }}>{event.organizer.name}</td>
                                <td style={{ padding: "10px" }}>
                                    {event.status === "PENDING" ? 
                                        (<span >Draft</span>) : 
                                        ((event.status === "APPROVED" || event.status === "LIVE") && <span>Approved</span>) 
                                    }
                                </td>
                                <td style={{ padding: "10px" }}>
                                    <Link href={`/events/${event.id}`} className="btn btn-outline btn-xs">View</Link>
                                    <button className="btn btn-gold btn-xs" >Approve</button>
                                    <button className="btn btn-outline btn-xs" >Reject</button>
                                    <button className="btn btn-xs"  style={{backgroundColor: "red", color: "white"}}>Go Live</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {events.length === 0 && 
                    <p className="section-sub">No events found.</p>
                }
            </div>
    );
}
