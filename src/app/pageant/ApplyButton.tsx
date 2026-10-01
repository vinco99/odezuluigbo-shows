'use client'

import Link from "next/link";

export default function ApplyButton({ eventId }: { eventId?: string }){
    if (eventId) return <Link className="btn btn-gold" href={`/events/${eventId}/apply`}>Apply Now</Link>;

    return <Link className="btn btn-gold" href="/events">Browse Events</Link>;
}