import Link from "next/link";

type Pkg = { 
    id: string; 
    name: string; 
    description: string | null; 
    price: number 
};

export function TicketPackage({ pkg, slug }: { pkg: Pkg; slug: string }){

    return(
        <div className="event-card">
            <div className="ev-body">
                <h3>{pkg.name}</h3>
                <p style={{color: "var(--w70)", fontSize: ".85rem", marginBottom: "14px"}}>{pkg.description}</p>
                <div className="ev-prize" style={{marginBottom: "14px"}}>
                    <span>Price</span>
                    <strong>₦ {pkg.price.toLocaleString()}</strong>
                </div>
                <div className="ev-actions">
                    <Link href={`/tickets/${slug}/${pkg.id}`} className="btn btn-gold btn-sm btn-full">Select →</Link>
                </div>
            </div>
        </div>
    )
}