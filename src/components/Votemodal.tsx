"use client";

export default function VoteModal({ contestant, onClose }: { contestant: string; onClose: () => void }) {
    return <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={`Vote for ${contestant}`} onClick={onClose}><div className="modal-box" onClick={(event) => event.stopPropagation()}><button className="modal-close" type="button" onClick={onClose} aria-label="Close voting dialog">✕</button><h3>Vote for {contestant}</h3><p>Choose a voting package from the event page to proceed with Paystack payment.</p><button className="btn btn-ghost btn-full" type="button" onClick={onClose}>Close</button></div></div>;
}
