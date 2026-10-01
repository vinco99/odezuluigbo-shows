import Link from "next/link";
import { prisma } from "@/lib/prisma";
import VotePackageSelector from "@/components/VotePackageSelector";

export default async function Tabs() {
    const events = await prisma.event.findMany(
        { 
            where: { status: "APPROVED", isVotingOpen: true }, 
            include: { 
                contestants: { 
                    where: { applicationStatus: "APPROVED" }, 
                    include: { votes: { 
                        where: { status: "PAID" } 
                    }} 
                }, 
                votePackages: { 
                    where: { active: true }, 
                    orderBy: { amount: "asc" } 
                } 
            }, 
            orderBy: { eventDate: "asc" } 
        }
    );
    return (
        <div className="container">
            <div className="section-header">
                <span className="section-badge">Live Events</span>
                <h2 className="section-title">Choose a Contestant</h2>
                <p className="section-sub">Select a package to pay securely through Paystack.</p>
            </div>
            {events.length === 0 ? 
                <div className="form-box">
                    <h3>No live voting events</h3>
                    <p className="section-sub">Voting will appear here when an approved event opens its voting window.</p>
                </div> : 
                <div className="space-y-10">
                    {events.map((event) => 
                        <section key={event.id}>
                            <div className="flex justify-between items-center gap-3 flex-wrap mb-4">
                                <div>
                                    <span className="section-badge">{event.type.replaceAll("_", " ")}</span>
                                    <h3 className="section-title" style={{ fontSize: "1.6rem" }}>{event.title}</h3>
                                </div>
                                <Link href={`/events/${event.id}`} className="btn btn-outline btn-sm">View Event</Link>
                            </div>
                            {event.contestants.length === 0 ? 
                                <p className="section-sub">No approved contestants are available yet.</p> : 
                                <div className="contestants-grid">
                                    {event.contestants.map((contestant) => { const votes = contestant.votes.reduce((total, vote) => total + vote.quantity, 0); 
                                        return( 
                                            <article className="contestant-card" key={contestant.id}>
                                                <div className="img-placeholder c-img">
                                                    {contestant.photo ? 
                                                        <img src={contestant.photo} alt={contestant.name} className="w-full h-full object-cover" /> : 
                                                        <span className="ph-txt">{contestant.name}</span>
                                                    }
                                                </div>
                                                <div className="c-info">
                                                    <h4>{contestant.name}</h4>
                                                    <span className="c-sub">{contestant.state ?? "Contestant"}</span>
                                                    <small>{votes} paid votes</small>
                                                    
                                                    <VotePackageSelector 
                                                        contestantId={contestant.id} 
                                                        packages={event.votePackages} 
                                                    />
                                                </div>
                                            </article>); 
                                    })}
                                </div>
                            }
                        </section>
                    )}
                </div>
            }
        </div>);
}
