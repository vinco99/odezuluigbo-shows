"use client"; // Remove this if you're using the Pages Router

import { signIn, getSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { showToast } from "@/components/Toast";
import { dashboardPath } from "@/lib/dashboard";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        const form = new FormData(e.currentTarget);

        showToast("Logging in...");

        const result =
            await signIn("credentials",{
                email:form.get("email"),
                password:form.get("password"),
                redirect:false
            }
        );

        if (!result) {
            setError(true);
        }

        const session = await getSession();
        
        window.location.href = dashboardPath(session?.user?.role);
    };

    return (
        <div className="page active" id="page-admin-login">
        <div className="auth-page">
            <div className="auth-card">
            <h2 className="auth-title">Admin Sign In</h2>
            <p className="auth-subtitle">
                Restricted access — Odezuluigbo staff only
            </p>

            <form className="auth-form" onSubmit={handleSubmit}>
                <input
                className="auth-input"
                id="adminLoginEmail"
                type="email"
                name="email"
                placeholder="Admin email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <div className="pw-field">
                <input
                    className="auth-input"
                    id="adminLoginPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="button"
                    className="pw-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? (
                    <svg
                        className="eye-hide"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                    ) : (
                    <svg
                        className="eye-show"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                    )}
                </button>
                </div>

                <button className="btn btn-gold btn-full" type="submit">
                Sign In to Dashboard
                </button>
            </form>

            <p
                id="adminLoginError"
                style={{
                display: error ? "block" : "none",
                color: "#e05252",
                fontSize: ".82rem",
                textAlign: "center",
                marginTop: "14px",
                }}
            >
                Incorrect email or password.
            </p>

            <p className="auth-link">
                <Link href="/">← Back to site</Link>
            </p>
            </div>
        </div>

        <footer className="footer">
            <div className="container">
            <div className="footer-bottom">
                <p>© 2026 Odezuluigbo Global Ltd. All Rights Reserved.</p>
            </div>
            </div>
        </footer>
        </div>
    );
}