import { prisma } from "@/lib/prisma";
import Link from "next/link";
import type { EventStatus } from "@/generated/prisma/enums";
import "./event-preview.css";

const VISIBLE: EventStatus[] = ["APPROVED", "LIVE", "SUSPENDED", "COMPLETED"];

function badgeFor(status: EventStatus) {
  switch (status) {
    case "APPROVED":   return "AVAILABLE";
    case "SUSPENDED":  return "SUSPENDED";
    case "COMPLETED":  return "ENDED";
    default:           return null;
  }
}

function CalendarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
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
                const badge = badgeFor(ev.status);
                const date = ev.eventDate?.toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    });
                return(
                    <div className="new-event-card" key={ev.id}>
                        <div className="event-card__image">
                            {ev.banner ? (
                            <img src={ev.banner ?? ev.logo ?? ""} alt={ev.title} loading="lazy"/>
                            ) : (
                                <div className="event-card__image-placeholder">
                                    <span className="ph-icon" style={{ fontSize: "2.2rem" }}>
                                        {ev.logo ? <img src={ev.logo} alt="" /> : "🎭"}
                                    </span>
                                </div>
                            )}
                            {badge && <div className="ev-badge">{badge}</div>}
                        </div>
                        <div className="event-card__content">
                            <div className="event-card__meta">
                                {date && <span><CalendarIcon />{date}</span>}
                                {ev.venue && <span><PinIcon />{ev.venue}</span>}
                            </div>
                            <h3 className="event-card__title">{ev.slug}</h3>
                            <div className="event-card__actions">
                                {ev.status === "APPROVED" ? (
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