import Link from "next/link";
import Footer from "@/components/Footer";
import { EventsTabs } from "../_components/EventsTab";


export default async function EventLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="page active" id="page-events">
            <div className="page-hero">
                <div className="container">
                    <span className="section-badge">All Events</span>
                    <h1>Our Events</h1>
                    <p>Beauty pageants, reality TV, talent hunts, dance, comedy and more</p>
                </div>
            </div>
            <section className="section">
                <div className="container">
                    <EventsTabs />
                    <div className="all-events-grid">
                        {children}
                    </div>

                    <div style={{ 
                        marginTop: "56px", background: "linear-gradient(135deg,var(--dark-2),var(--dark-3))", 
                        border: "1px solid var(--g20)", borderRadius: "var(--radius-lg)", 
                        padding: "40px 28px", textAlign:"center"
                    }}>
                        <span className="section-badge">Organizers</span>
                        <h3 style={{fontFamily: "var(--fh)", fontSize: "1.5rem", margin: "12px 0 8px"}}>Have An Event Idea?</h3>
                        <p style={{color: "var(--w70)", fontSize: ".9rem", maxWidth: "480px", margin: "0 auto 22px"}}>Host your own pageant, talent hunt or competition with full revenue tracking.</p>
                        <Link className="btn btn-gold" href="/organizer/apply">Become an Organizer →</Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}