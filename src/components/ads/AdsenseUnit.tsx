"use client";

import { useEffect, useRef } from "react";

export function AdsenseUnit({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.innerHTML = "";

    // Range-fragment insertion runs <script> tags; innerHTML does not.
    const range = document.createRange();
    range.selectNodeContents(el);
    const fragment = range.createContextualFragment(code);
    el.appendChild(fragment);
  }, [code]);

  return <div ref={ref} />;
}