
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/vote/topup", label: "Top Up Wallet" },
  { href: "/vote/wallet", label: "My Wallet" },
  { href: "/vote/pageant", label: "Pageant Votes" },
  { href: "/vote/reality-tv", label: "Reality TV Votes" },
  { href: "/vote/tasks", label: "Earn Free Votes" },
];

export function VoteNavigation() {
  const pathname = usePathname();

  return (
    <div className="vote-tabs" aria-label="Voting navigation">
    {links.map((link) => {
        const active = pathname === link.href;

        return (
        <Link
            key={link.href}
            href={link.href}
            className={`vote-tab ${active ? "active" : ""}`}
            aria-current={active ? "page" : undefined}
        >
            {link.label}
        </Link>
        );
    })}
    </div>
  );
}
