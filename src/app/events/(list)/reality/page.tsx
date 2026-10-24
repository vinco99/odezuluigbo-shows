import { prisma } from "@/lib/prisma";
import { EventType } from '@/generated/prisma/client';
import Link from "next/link";
import "../../_components/event-preview.css";

const COMPETING_EVENT_TYPES: EventType[] = [
  EventType.PAGEANT,
  EventType.REALITY_SHOW,
  EventType.TALENT_SHOW,
];

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

export default async function RealityEventsPage() {

    const events = await prisma.event.findMany({
        where:{ status: {in: ["APPROVED", "LIVE", "COMPLETED"]}, type: "REALITY_SHOW"},
        orderBy:{createdAt: "asc"}
    })
    
    return(
        <div className="new-events-grid">
            {
                events.map((event)=> {
                    const isCompeting = COMPETING_EVENT_TYPES.includes(event.type);
                    const grandPrize = event.prize1st ?? event.prize2nd ?? event.prize3rd ?? null;
                    const image = event.banner || event.logo;
                    const date = event.eventDate?.toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    });

                    return(
                    <div key={event.id} className={`new-event-card${isCompeting ? ' event-card--competition' : ''}`}>
                        <Link className="event-card__image-link" href={`/events/${event.id}`} aria-label={`View ${event.title}`}>
                            <div className="event-card__image">
                                {image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={image} alt={event.title} loading="lazy" />
                                ) : (
                                    <div className="event-card__image-placeholder" aria-hidden="true">O</div>
                                )}
                            </div>
                            <div className="ev-badge">
                                {event.status === 'LIVE' ? 'Live now' : isCompeting ? 'Competition' : 'Featured Event'}
                            </div>
                        </Link>
                        <div className="event-card__content">
                            <div className="event-card__meta">
                                {date && <span><CalendarIcon />{date}</span>}
                                <span>
                                    <PinIcon />{event.venue ?? event.state ?? event.country ?? "Location to be announced"}
                                </span>
                            </div>
                            <h3 className="event-card__title"><em>{event.title}</em></h3>
                            {isCompeting && (
                                <div className="event-card__prize">
                                    <span>Grand prize</span>
                                    {grandPrize != null && (
                                        <strong>₦{grandPrize.toLocaleString('en-US')}</strong>
                                    )}

                                </div>
                            )}
                            <div className="event-card__actions">
                                <Link className="btn btn-gold btn-sm" href={`/events/${event.id}`}>View Details</Link>
                                {isCompeting && (
                                    <Link className="btn btn-outline" href={`/vote`}>Vote</Link>
                                )}
                            </div>
                        </div>
                    </div>
                    );
                })
            }
        </div>
    )
}