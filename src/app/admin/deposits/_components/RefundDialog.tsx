"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { confirmRefund, requestRefundOtp } from "../_actions";
import type { DepositRow } from "./DepositsTable";

type Step = "reason" | "code" | "done";

export function RefundDialog({
    deposit,
    reversalNote,
    onClose,
}: {
    deposit: DepositRow;
    reversalNote: string;
    onClose: () => void;
}) {
    const router = useRouter();
    const [step, setStep] = useState<Step>("reason");
    const [reason, setReason] = useState("");
    const [code, setCode] = useState("");
    const [sentTo, setSentTo] = useState("");
    const [error, setError] = useState("");
    const [result, setResult] = useState("");
    const [pending, startTransition] = useTransition();

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && !pending && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose, pending]);

    function sendCode() {
        setError("");
        startTransition(async () => {
            const res = await requestRefundOtp(deposit.id, reason);
            if (!res.ok) return setError(res.error);
            setSentTo(res.sentTo);
            setCode("");
            setStep("code");
        });
    }

    function confirm() {
        setError("");
        startTransition(async () => {
            const res = await confirmRefund(deposit.id, code);
            if (!res.ok) return setError(res.error);
            setResult(res.message);
            setStep("done");
            router.refresh();
        });
    }

    const amount = `₦${deposit.amount.toLocaleString()}`;

    return (
        <div
            className="modal-overlay active"
            role="dialog"
            aria-modal="true"
            aria-labelledby="refund-title"
            onClick={(e) => e.target === e.currentTarget && !pending && onClose()}
        >
            <div className="modal-box">
                <button type="button" className="modal-close" aria-label="Close" onClick={onClose} disabled={pending}>×</button>
                <h3 id="refund-title" style={{ marginBottom: "6px" }}>Refund {amount}</h3>
                <p style={{ color: "var(--w70)", fontSize: ".85rem", marginBottom: "16px" }}>
                    {deposit.customer} · {deposit.type.replaceAll("_", " ").toLowerCase()}
                    {deposit.event ? ` · ${deposit.event}` : ""}
                    <br />
                    <span style={{ color: "var(--w30)" }}>ref {deposit.reference}</span>
                </p>

                {step === "reason" && (
                    <>
                        <p style={{ fontSize: ".85rem", marginBottom: "14px" }}>
                            The full amount goes back to the customer&apos;s card or bank through Paystack. {reversalNote}
                        </p>
                        <div className="form-group">
                            <label htmlFor="refund-reason">Reason</label>
                            <textarea
                                id="refund-reason"
                                rows={3}
                                maxLength={300}
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="e.g. Event cancelled, duplicate payment"
                                autoFocus
                            />
                        </div>
                        {error && <p role="alert" style={{ color: "var(--red, #e66)", fontSize: ".85rem" }}>{error}</p>}
                        <button
                            type="button"
                            className="btn btn-gold btn-full"
                            disabled={pending || reason.trim().length < 5}
                            onClick={sendCode}
                        >
                            {pending ? "Checking…" : "Email me a confirmation code"}
                        </button>
                    </>
                )}

                {step === "code" && (
                    <form onSubmit={(e) => { e.preventDefault(); confirm(); }}>
                        <p style={{ fontSize: ".85rem", marginBottom: "14px" }}>
                            We sent a 6-digit code to <strong>{sentTo}</strong>. It expires in 10 minutes.
                        </p>
                        <div className="form-group">
                            <label htmlFor="refund-code">Confirmation code</label>
                            <input
                                id="refund-code"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                maxLength={6}
                                value={code}
                                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                                style={{ letterSpacing: "6px", fontSize: "1.2rem", textAlign: "center" }}
                                autoFocus
                            />
                        </div>
                        {error && <p role="alert" style={{ color: "var(--red, #e66)", fontSize: ".85rem" }}>{error}</p>}
                        <button type="submit" className="btn btn-red btn-full" disabled={pending || code.length !== 6}>
                            {pending ? "Refunding…" : `Confirm refund of ${amount}`}
                        </button>
                        <button
                            type="button"
                            className="btn btn-ghost btn-full"
                            style={{ marginTop: "8px" }}
                            disabled={pending}
                            onClick={sendCode}
                        >
                            Send a new code
                        </button>
                    </form>
                )}

                {step === "done" && (
                    <>
                        <p style={{ fontSize: ".9rem", marginBottom: "16px" }}>{result}</p>
                        <button type="button" className="btn btn-gold btn-full" onClick={onClose}>Done</button>
                    </>
                )}
            </div>
        </div>
    );
}
