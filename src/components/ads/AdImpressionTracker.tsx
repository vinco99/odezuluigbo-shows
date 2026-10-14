"use client";

import { useEffect, useRef } from "react";
import { trackAdImpression } from "@/app/api/ads/_actions";

export function AdImpressionTracker({ adId }: { adId: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !fired.current) {
            fired.current = true;
            void trackAdImpression(adId);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [adId]);

  return <span ref={ref} aria-hidden="true" style={{ display: "block", height: 0 }} />;
}