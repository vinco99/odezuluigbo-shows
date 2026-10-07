import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function RealityEventsPage() {

    const events = await prisma.event.findMany({
        where:{ status: "APPROVED", type: "REALITY_SHOW"},
        orderBy:{createdAt: "asc"}
    })
    
    return(
        <div>
            {
                events.map(event =>(
                <div className="event-card" key={event.id}>
                    <div className="ev-img">
                        <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Stage%20lights.jpg?width=800" alt="Odenigwe Reality TV Show" loading="lazy" style={{width: "100%", height: "100%", objectFit: "cover"}} />
                            <div className={event.status === 'LIVE' ? "ev-badge live" : "ev-bage"}>{event.status === 'LIVE' ? "LIVE" : "LIVE SOON"}</div>
                    </div>
                    <div className="ev-body">
                        <div className="ev-meta">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: "middle", marginRight: "4px", flexShrink: "0"}}>
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                <line x1="16" y1="2" x2="16" y2="6"/>
                                <line x1="8" y1="2" x2="8" y2="6"/>
                                <line x1="3" y1="10" x2="21" y2="10"/>
                                </svg> {event.eventDate?.getFullYear()}
                            </span>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: "middle", marginRight: "4px", flexShrink: "0"}}>
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                <circle cx="12" cy="10" r="3"/>
                                </svg> {event.country}
                            </span>
                        </div>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <div className="ev-prize">
                            <span>Grand Prize</span>
                            <strong>₦5,000,000 + 
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: "middle", marginRight: "3px"}}>
                                <path d="M16 3h-2l-2 2H8L5 8l-1 2v8h2v-2h12v2h2V10l-1-2-3-5z"/>
                                <circle cx="7.5" cy="15.5" r="1.5"/>
                                <circle cx="16.5" cy="15.5" r="1.5"/>
                                </svg>
                            </strong>
                        </div>
                        <div className="ev-actions">
                            <Link className="btn btn-gold btn-sm" href={`/events/${event.id}`}>View Details</Link>
                            <Link className="btn btn-outline btn-sm" href={`/vote`}>Vote</Link>
                        </div>
                    </div>
                </div>
                ))
            }
        </div>
    )
}