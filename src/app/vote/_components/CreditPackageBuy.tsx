"use client";

import { useTransition } from "react";
import { initCreditPackagePurchase } from "@/app/vote/_actions";

export function CreditPackageBuy({
  packageId,
  className = "btn btn-gold",
  disabled,
  children,
}: {
  packageId: string;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
    const [pending, startTransition] = useTransition();

    function go() {
        const form = new FormData();
        form.set("packageId", packageId);

        startTransition(async () => {
            const res = await initCreditPackagePurchase(form);

            if (res.ok) {
                window.location.href = res.authorizationUrl;
            } else {
                alert(res.error);
            }
        });
    }

    return (
        <button type="button" className={className} disabled={disabled || pending} onClick={go}>
            {pending ? "Redirecting…" : children}
        </button>
    );
}