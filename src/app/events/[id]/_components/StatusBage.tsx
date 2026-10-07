'use client'
type Event = {
    id: string;
    status: string;
}
export function StatusBage ({ event }: { event: Event }) {
    return (
        <div className={`status-badge ${event.status.toLowerCase()}`}>{event.status}</div>
    )
}