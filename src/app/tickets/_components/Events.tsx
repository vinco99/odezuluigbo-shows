import { prisma } from "@/lib/prisma";
import Link from "next/link";
import type { EventStatus } from "@/generated/prisma/enums";

const VISIBLE: EventStatus[] = ["APPROVED", "LIVE", "SUSPENDED", "COMPLETED"];

function badgeFor(status: EventStatus) {
  switch (status) {
    case "APPROVED":   return "COMING SOON";
    case "SUSPENDED":  return "SUSPENDED";
    case "COMPLETED":  return "ENDED";
    default:           return null;
  }
}

export async function Events(){
    const events = await prisma.event.findMany(
        {
            where: {status: { in: VISIBLE } },
            orderBy: { eventDate: "asc"}
        }
    );
    

    return(
    
        <div className="events-grid" id="ticketEventGrid">

            {events.map((ev) => {
                const buyable = ev.status === "LIVE";
                const badge = badgeFor(ev.status);
                const location = [ev.venue, ev.state].filter(Boolean).join(", ");
                return(
                    <div className="event-card" key={ev.id}>
                        <div className="ev-img">
                            {ev.banner ? (
                            <img src={ev.banner ?? ev.logo ?? ""} alt={ev.title} loading="lazy" style={{width: "100%", height: "100%", objectFit: "cover"}} />
                            ) : (
                                <div className="img-placeholder" style={{ height: "160px" }}>
                                    <span className="ph-icon" style={{ fontSize: "2.2rem" }}>
                                        {ev.logo ? <img src={ev.logo} alt="" /> : "🎭"}
                                    </span>
                                </div>
                            )}
                            {badge && <div className="ev-badge">{badge}</div>}
                        </div>
                        <div className="ev-body">
                            <div className="ev-meta">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:"middle",marginRight:"4px", flexShrink: "0"}} >
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                    <line x1="16" y1="2" x2="16" y2="6"/>
                                    <line x1="8" y1="2" x2="8" y2="6"/>
                                    <line x1="3" y1="10" x2="21" y2="10"/>
                                    </svg> {ev.eventDate?.toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        }) ?? "Date to be announced"}
                                </span>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:"middle",marginRight:"4px", flexShrink: "0"}}>
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                    <circle cx="12" cy="10" r="3"/>
                                    </svg> {ev.venue ?? ev.state ?? ev.country ?? "Location to be announced"}
                                </span>
                            </div>
                            <h3>{ev.slug}</h3>
                            <div className="ev-actions">
                                {ev.status === "LIVE" ? (
                                    <Link href={`/tickets/${ev.slug}`} className="btn btn-gold btn-sm">Buy Tickets</Link>
                                    ) : (
                                        <button className="btn btn-outline btn-sm" disabled style={{opacity: ".5", cursor: "not-allowed"}}>
                                            {ev.status === "SUSPENDED" ? "Unavailable" : "Not Yet Available"}
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}