"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
    { href: "/admin/events",   label: "Events" },
    { href: "/admin/organizers", label: "Organizer" },
    { href: "/admin/contestants", label: "Contestants" },
    { href: "/admin/users",    label: "Users" },
    { href: "/admin/payments", label: "Payments & Votes" },
    { href: "/admin/contents",  label: "Contents" },
    { href: "/admin/tasks",    label: "Tasks & Judges" },
] as const;

export function AdminTabs() {
    const pathname = usePathname();
    return (
        <div className="vote-tabs" style={{ flexWrap: "wrap" }}>
            {TABS.map(t => (
                <Link
                    key={t.href}
                    href={t.href}
                    className={`vote-tab ${pathname.startsWith(t.href) ? "active" : ""}`}
                >
                    {t.label}
                </Link>
            ))}
        </div>
    );
}