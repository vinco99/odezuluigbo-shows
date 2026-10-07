import { Events } from "./_components/Events";

export default function ticketsPage(){
    
    return(
        <div id="ticketStep1">
            <div className="section-header">
                <span className="section-badge">Step 1 of 3</span>
                <h2 className="section-title">Choose an Event</h2>
            </div>

            <Events />
        </div>
    )
}