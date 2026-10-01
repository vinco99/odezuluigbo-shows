"use client";

import { useState } from "react";

type Package = { 
    id: string; 
    name: string; 
    votes: number; 
    amount: number 
};
export default function VotePackageSelector(
    { contestantId, packages }: { contestantId: string; packages: Package[] }) {
    const [message, setMessage] = useState("");

    async function pay(packageId: string) {

        const response = await fetch(
            "/api/votes/initialize", 
            { method: "POST", 
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify({ contestantId, packageId }) 
            }
        );
        
        const data = await response.json();
        if (!response.ok) 
            return setMessage(data.error ?? "Unable to initialize payment");

        window.location.href = data.authorization_url;
    }

  return (
    <div className="flex gap-2 flex-wrap justify-center mt-3">
        {packages.map((pack) => 
            <button key={pack.id} onClick={() => pay(pack.id)} className="btn btn-gold btn-xs">
                {pack.name}: {pack.votes} votes (₦{pack.amount.toLocaleString()})
            </button>)}{message && <small>{message}</small>
        }
    </div>);
}
