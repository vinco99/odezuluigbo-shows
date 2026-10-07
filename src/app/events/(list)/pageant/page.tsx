import { prisma } from "@/lib/prisma";
import Link from "next/link";


export default async function PageantEventPage(){

    const events = await prisma.event.findMany({
        where:{ status:"APPROVED", type: "PAGEANT"},
        orderBy:{ createdAt: "desc" }
    });

    return (
        <div>
        {
            events.map(event =>(
                <div className="event-card" key={event.id}>
                    <div className="ev-img">
                        <img src={event.banner ?? event.logo ?? "https://commons.wikimedia.org/wiki/Special:FilePath/Cross%20Section%20of%20all%20contestants%20of%20Face%20of%20Culture%20in%20Nigeria%20Beauty%20Pageant.jpg?width=800"} alt={event.title} loading="lazy" style={{width: "100%", height: "100%", objectFit: "cover"}} />
                        <div className="ev-badge">FEATURED</div>
                    </div>
                    <div className="ev-body">
                        <div className="ev-meta">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: "middle", marginRight: "4px", flexShrink: "0"}}>
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                <line x1="16" y1="2" x2="16" y2="6"/>
                                <line x1="8" y1="2" x2="8" y2="6"/>
                                <line x1="3" y1="10" x2="21" y2="10"/>
                                </svg> {event.eventDate ? 
                                event.eventDate.toLocaleDateString("en-GB",{
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })
                               : "Date not set" }
                            </span>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: "middle", marginRight: "4px", flexShrink: "0"}}>
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                <circle cx="12" cy="10" r="3"/>
                                </svg> {event.venue}
                            </span>
                        </div>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <div className="ev-prize">
                            <span>Grand Prize</span>
                            <strong>₦1,000,000</strong>
                        </div>
                        <div className="ev-actions">
                            <Link className="btn btn-gold btn-sm" href={`/events/${event.id}`}>View Details</Link>
                            <Link className="btn btn-outline btn-sm" href={"/vote"}>Vote</Link>
                        </div>
                    </div>
                </div>
            ))
        }
        </div>
    )
}