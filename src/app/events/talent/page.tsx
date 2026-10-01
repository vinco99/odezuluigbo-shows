import { prisma } from "@/lib/prisma";
import Link from "next/link";


export default async function TalentEventPage(){
    const events = await prisma.event.findMany({
        where:{status:"APPROVED", type: "TALENT_SHOW"},
        orderBy:{createdAt:"desc"}
    });

    return (
        <div>
        {
            events.map(event=>(
                <div className="event-card" key={event.id}>
                    <div className="ev-img">
                        <img src={event.banner ?? event.logo ?? ""} alt={event.title} loading="lazy" style={{width: "100%", height: "100%", objectFit: "cover"}} />
                    </div>
                    <div className="ev-body">
                        <div className="ev-meta">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: "middle", marginRight: "4px"}}>
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                <line x1="16" y1="2" x2="16" y2="6"/>
                                <line x1="8" y1="2" x2="8" y2="6"/>
                                <line x1="3" y1="10" x2="21" y2="10"/>
                                </svg>{event.status === 'COMPLETED' ? "Ended" : event.status === 'LIVE' ? "Live" : event.status === 'SUSPENDED' ? "Suspended" : "Comming soon"}
                            </span>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: "middle", marginRight: "4px"}}>
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                <circle cx="12" cy="10" r="3"/>
                                </svg> {event.country ?? "location to be announced"}
                            </span>
                        </div>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <div className="ev-actions">
                            <Link className="btn btn-gold btn-sm" href={`/events/${event.id}`}>Register Interest</Link>
                        </div>
                    </div>
                </div>
            ))
        }
        </div>
    );
}