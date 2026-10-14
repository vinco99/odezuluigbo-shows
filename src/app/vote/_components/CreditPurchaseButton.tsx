"use client";

import { useTransition } from "react";
import { initCreditPurchase } from "@/app/vote/_actions";

export function CreditPurchaseButton({
  credits,
  className = "btn btn-gold",
  disabled,
  children,
}: {
  credits: number;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const [pending, startTransition] = useTransition();

  function go() {
    const form = new FormData();
    form.set("quantity", String(credits));
    startTransition(async () => {
      const res = await initCreditPurchase(form);
      if (res.ok) window.location.href = res.authorizationUrl;
      else alert(res.error);
    });
  }

  return (
    <button type="button" className={className} disabled={disabled || pending} onClick={go}>
      {pending ? "Redirecting…" : children}
    </button>
  );
}