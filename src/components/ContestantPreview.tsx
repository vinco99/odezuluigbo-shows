import {prisma } from "@/lib/prisma";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export  async function ContestantPreview() {

    const contestants = await prisma.contestant.findMany({
        where: { event: { 
            type: "REALITY_SHOW",
            status: "LIVE"
        } },
        include: { 
            event: true,
            votes: true
         },
        take: 8
    });


    return(
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Stars</span>
            <h2 className="section-title">Featured Contestants</h2>
            <p className="section-sub">Meet the talented individuals competing for glory</p>
          </div>
        <div className="contestants-grid active">

            {
                contestants.map((contestant, index) =>{
                    const voteCount = contestant.votes.length;
                    return (
                        <ScrollReveal
                            key={contestant.id}
                            delay={index * 120}
                        >
                        <div className="contestant-card">
                            <img src={contestant.photo ?? "https://oss-macaron-user.macaron.im/photo/aa93cb00-3a6a-4502-8fbb-e4a98441d4c0.png"} alt={contestant.name} className="c-img" style={{ width: '100%', height: '235px', objectFit: 'cover', objectPosition: 'top center' }} />
                            <div className="c-info">
                                <h4>{contestant.name}</h4>
                                <span className="c-sub">{contestant.event.title}</span>
                                <div className="vote-bar">
                                <div className="vote-fill" style={{ width: `${voteCount * 100}%`}}></div>
                                </div>
                                <small>{contestant.votes.length} votes</small>
                                <Link className="btn btn-gold btn-xs" href={`/events/${contestant.eventId}`}>
                                Vote
                                </Link>
                            </div>
                        </div>
                        </ScrollReveal>
                    );
                })
            }

        </div>
        <div className="section-cta">
            <Link href="/vote" className="btn btn-gold" >
              Vote for Your Favourite →
            </Link>
          </div>
        </div>
    );
    
}