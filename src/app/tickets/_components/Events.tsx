import { prisma } from "@/lib/prisma";
import Link from "next/link";

export async function Events(){

    return(
        <div id="ticketStep1">
            <div className="section-header">
                <span className="section-badge">Step 1 of 3</span>
                <h2 className="section-title">Choose an Event</h2>
            </div>
            <div className="events-grid" id="ticketEventGrid">
                <div className="event-card">
                    <div className="ev-img">
                        <div className="img-placeholder" style={{height: "160px"}}>
                            <span className="ph-icon" style={{fontSize: "2.2rem"}}>ev.icon</span>
                        </div>
                    (live ? '' : '<div className="ev-badge">COMING SOON</div>') 
                    </div>
                    <div className="ev-body">
                        <div className="ev-meta">
                            <span>📅 ev.date</span><span>📍 ev.location</span>
                        </div>
                        <h3>ev.name</h3>
                        <div className="ev-actions">
                            (live
                                ? <button className="btn btn-gold btn-sm">Buy Tickets</button>
                                : <button className="btn btn-outline btn-sm" disabled style={{opacity: ".5", cursor: "not-allowed"}}>Not Yet Available</button>'
                            )
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}