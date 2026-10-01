"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
    { href: "/events/all",   label: "All Events" },
    { href: "/events/pageant",    label: "Pageant" },
    { href: "/events/reality", label: "Reality" },
    { href: "/events/talent",  label: "Talent" },
    { href: "/events/cultural",    label: "Cultural" },
] as const;

export function EventsTabs() {
    const pathname = usePathname();
    return (
        <div className="event-filter-bar">
            {TABS.map(t => (
                <Link
                    key={t.href}
                    href={t.href}
                    className={`filter-btn ${pathname.startsWith(t.href) ? "active" : ""}`}
                >
                    {t.label}
                </Link>
            ))}
        </div>
    );
}