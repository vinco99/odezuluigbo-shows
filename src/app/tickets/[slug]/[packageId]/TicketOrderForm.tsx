

export async function TicketOrderForm (){

    return(
        <div className="form-box">
            <div id="ticketOrderSummary" 
                style={{background: "var(--g10)", border: "1px solid var(--g20)", 
                    borderRadius: "var(--radius)", padding: "16px", marginBottom: "20px"
                }}
            >
                <p style={{fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--w30)", margin: "0 0 6px"}}>Order Summary</p>
                <p style={{color: "var(--white)", fontSize: ".95rem", margin: "0 0 2px"}}>currentTicketEvent.name</p>
                <p style={{color: "var(--gold)", fontSize: ".85rem", margin: "0"}}>currentTicketPackage.name (1 ticket)</p>
            </div>
            <p style={{color: "var(--w30)", fontSize: ".76rem", margin: "0 0 16px"}}>
                Each order is for one ticket. Buying for someone else? Just enter their details below — their ticket and unique QR code will be sent straight to the email you provide.
            </p>
            <form onSubmit={}>
                <div className="form-group">
                    <label>Ticket Holder's Full Name *</label>
                    <input type="text" id="ticketName" placeholder="Full name of the person attending" required />
                </div>
                <div className="form-group">
                    <label>Ticket Holder's Email Address *</label>
                    <input type="email" id="ticketEmail" placeholder="Their ticket + QR code is sent here" required />
                </div>
                <div className="form-group">
                    <label>Ticket Holder's Phone Number *</label>
                    <input type="tel" id="ticketPhone" placeholder="+234 xxx xxxx xxx" required />
                </div>

                <div style={{display: "flex", justifyContent: "space-between", 
                        alignItems: "center", padding: "14px 0", borderTop: "1px solid var(--w10)", 
                        margin: "10px 0 18px"
                    }}>

                    <span style={{color: "var(--w70)", fontSize: ".9rem"}}>Total</span>
                    <strong id="ticketTotalPrice" style={{color: "var(--gold)", fontSize: "1.3rem", fontFamily: "var(--fh)"}}>₦ (Price)</strong>
                </div>
                <button type="submit" className="btn btn-gold btn-full">Proceed to Payment →</button>
            </form>
        </div>
    )
}