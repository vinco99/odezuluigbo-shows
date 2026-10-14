"use client";

import { trackAdClick } from "@/app/api/ads/_actions";

export function AdLink({
  adId,
  href,
  children,
  ...rest
}: {
  adId: string;
  href: string;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">) {
  return (
    <a
      href={href}
      {...rest}
      onClick={() => {
        // fire and forget — don't await, don't block navigation
        void trackAdClick(adId);
      }}
    >
      {children}
    </a>
  );
}