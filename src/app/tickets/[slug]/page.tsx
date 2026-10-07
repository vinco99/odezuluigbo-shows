
export default function SelectTicket(){

    return(
        <div id="ticketStep2">
            <button className="btn btn-outline btn-sm"  style={{marginBottom: "24px"}}>← Back to Events</button>
            <div className="section-header">
                <span className="section-badge">Step 2 of 3</span>
                <h2 className="section-title" id="ticketStep2Title">Choose Your Ticket</h2>
            </div>
            <div className="events-grid" id="ticketPackageGrid" style={{gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))"}}>

            </div>
        </div>
    )
}