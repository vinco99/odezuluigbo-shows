
export default async function TicketsLayout({ children }: { children: React.ReactNode }) {

    return(
        <div className="page active" id="page-tickets">
            <div className="page-hero">
                <div className="container">
                    <span className="section-badge">In-Person Events</span>
                    <h1>Buy Tickets</h1>
                    <p>Reserve your seat or table at an upcoming Odezuluigbo show</p>
                </div>
            </div>
            <section className="section">
                <div className="container">
                    {children}
                </div>
            </section>

            <footer className="footer">
                <div className="container">
                    <div className="footer-bottom">
                        <p>© 2026 Odezuluigbo Global Ltd. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
    
}