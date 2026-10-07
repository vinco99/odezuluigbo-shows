

export async function TicketPackages(slug: string){

    return(
        <div className="event-card">
            <div className="ev-body">
                <h3>pkg.name</h3>
                <p style={{color: "var(--w70)", fontSize: ".85rem", marginBottom: "14px"}}>pkg.desc</p>
                <div className="ev-prize" style={{marginBottom: "14px"}}>
                    <span>Price</span>
                    <strong>₦ pkg.price.toLocaleString()</strong>
                </div>
                <div className="ev-actions">
                    <button className="btn btn-gold btn-sm btn-full">Select →</button>
                </div>
            </div>
        </div>
    )
}