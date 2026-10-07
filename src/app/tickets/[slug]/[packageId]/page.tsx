import { TicketOrderForm } from "./TicketOrderForm";


export default function TicketOrder(){

    return(
        <div id="ticketStep3" style={{maxWidth: "520px", margin: "0 auto"}}>
            <button className="btn btn-outline btn-sm" style={{marginBottom: "24px"}}>← Back to Tickets</button>
            <div className="section-header">
                <span className="section-badge">Step 3 of 3</span>
                <h2 className="section-title">Checkout</h2>
            </div>

            <TicketOrderForm />
        </div>
    )
}