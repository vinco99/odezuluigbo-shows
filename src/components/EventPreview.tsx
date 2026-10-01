import { EventType, Event } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import Link from "next/link";
import ScrollReveal from './ScrollReveal';

async function getThreeEventsOnePerCategory() {
  const categories = [
    EventType.PAGEANT,
    EventType.REALITY_SHOW,
    EventType.TALENT_SHOW,
  ];

  const events = await Promise.all(
    categories.map((category) =>
    prisma.event.findFirst({
        where: { type: category, status: "APPROVED" },
        orderBy: { createdAt: 'desc' }
    }))
  );

  return events.filter((e): e is Event => e !== null);
}

export async function EventPreview() {

    const events = await getThreeEventsOnePerCategory();

    return(
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Featured</span>
            <h2 className="section-title">Upcoming Events</h2>
            <p className="section-sub">Discover world-className Igbo entertainment and competitions</p>
          </div>
        <div className="events-grid">
            {
                events.map((event, index) => (
                    <ScrollReveal
                        key={event.id}
                        delay={index * 120}
                    >
                        <div className="event-card featured-card">
                            <div className="ev-img">
                            <div className="ev-img" >
                                <img src={event.banner ?? event.logo ?? " "}  alt={event.title} loading="lazy" style={{width: "100%", height: "100%", objectFit: "cover"}}/>
                            </div>
                            <div className={event.status === 'LIVE' ? "ev-bage live" :"ev-badge"}>{event.status === 'LIVE' ? "LIVE" : "FEATURED"}</div>
                            </div>
                            <div className="ev-body">
                                <div className="ev-meta">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle", marginRight: "4px" }}>
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                        <line x1="16" y1="2" x2="16" y2="6"/>
                                        <line x1="8" y1="2" x2="8" y2="6"/>
                                        <line x1="3" y1="10" x2="21" y2="10"/>
                                        </svg> {event.eventDate?.toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </span>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle", marginRight: "4px" }}>
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                        <circle cx="12" cy="10" r="3"/>
                                        </svg> {event.state}
                                    </span>
                                </div>
                                <h3>{event.title}</h3>
                                <p>{event.description}. Grand Prize: ₦1,000,000</p>
                                <div className="ev-prize">
                                    <span>Grand Prize</span>
                                    <strong>₦1,000,000</strong>
                                </div>
                                <div className="ev-actions">
                                    <Link className="btn btn-gold btn-sm" href={event.type === 'PAGEANT' ? `/${event.type.toLocaleLowerCase()}` : "/events"}>
                                    Learn More
                                    </Link>
                                    <Link className="btn btn-outline btn-sm" href={`/events/${event.id}`}>
                                    Vote
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                ))
            }
        </div>
        <div className="section-cta">
            <Link className="btn btn-ghost" href="/events">
              View All Events →
            </Link>
          </div>
        </div>
    );
}