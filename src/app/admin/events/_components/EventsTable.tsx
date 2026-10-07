import Link from "next/link";
import EventReviewButtons from "./ReviewEventButton";
import GoLiveButton from "./GoLiveButton";
import SuspendEventButton from "./SuspendEventButton";

type EventRow = { 
    id: string; 
    title: string; 
    type: string; 
    status: string; 
    organizer: { name: string }; 
    _count?: { contestants: number } 
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
                                <td style={{ padding: "10px" }} className="lowercase first-letter:uppercase">{event.type.replaceAll("_", " ")}</td>
                                <td style={{ padding: "10px" }}>{event.organizer.name}</td>
                                <td style={{ padding: "10px" }} >
                                    <span className={`status-badge ${event.status.toLowerCase()}`}>{event.status.toLocaleLowerCase()}</span>
                                </td>
                                <td style={{ padding: "10px" }}>
                                    <Link href={`/organizer/events/${event.id}`} className="btn btn-outline btn-xs">View</Link>

                                    <EventReviewButtons 
                                        id={event.id}  
                                        disabled={event.status !== "PENDING"} 
                                    />

                                    <GoLiveButton 
                                        id={event.id} 
                                        disabled={event.status !== "APPROVED"} 
                                    />

                                    <SuspendEventButton 
                                        id={event.id} 
                                        disabled={event.status !== "LIVE"} 
                                    />
                                    
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
