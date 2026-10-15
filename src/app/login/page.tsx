"use client";
import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { showToast } from "@/components/Toast";
import { dashboardPath } from "@/lib/dashboard";


export default function LoginPage(){

    const [message,setMessage] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    async function handleSubmit(e:React.FormEvent<HTMLFormElement>){

        e.preventDefault();

        const form = new FormData(e.currentTarget);

        showToast("Logging in...");

        const result =
        await signIn("credentials",{
            email:form.get("email"),
            password:form.get("password"),
            redirect:false
        });


        if(result?.error){
            setMessage("Invalid email or password");
            showToast("Invalid email or password");
            return;
        }
        
        const session = await getSession();

        window.location.href = dashboardPath(session?.user?.role);
    }


    return (
        <div className="page active" id="page-login">
            <div className="auth-page">
                <div className="auth-card">
                    <h2 className="auth-title">Welcome Back</h2>
                    <p className="auth-subtitle">Sign in to your Odezuluigbo account</p>
                    <form className="auth-form"onSubmit={handleSubmit}>
                        <input className="auth-input" name="email" type="email" placeholder="Email address" required />
                        <div className="pw-field" style={{ position: "relative", display: "flex", alignItems: "center", width: "100%"}}>
                            <input className="auth-input" id="adminLoginPassword" type={showPassword ? "text" : "password"} placeholder="Password" name="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ paddingRight: "44px"}}
                            />

                            <button
                                type="button"
                                className="pw-toggle"
                                onClick={() => setShowPassword((prev) => !prev)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                style={{  flexShrink: "0", position: "absolute", 
                                    right: "12px",
                                    background: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                    color: "var(--w70, #a0aec0)", 
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "4px",
                                    zIndex: "10",
                                }}
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
                                    style={{flexShrink: "0"}}
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
                                    style={{ flexShrink: "0"}}
                                >
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                                )}
                            </button>
                        </div>
                        <div className="auth-forgot">
                            <Link href="/forgotten">Forgot password?</Link>
                        </div>
                        <p>{message}</p>
                        <button className="btn btn-gold btn-full" type="submit">
                            Sign In
                        </button>
                    </form>
                    <div className="auth-divider">
                        <span>or continue with</span>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                        <button className="social-btn google" onClick={() => {
                                showToast("Signing in with Google...");
                                signIn("google", {callbackUrl:"/auth/redirect"});
                                showToast("Signed in");
                            }
                        }>
                        <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Continue with Google
                        </button>
                        <button className="social-btn facebook" onClick={() => {
                                showToast("Signing in with Facebook...");
                                signIn("facebook", {callbackUrl:"/auth/redirect"});
                                showToast("Signed in");
                            }
                        }>
                        <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        Continue with Facebook
                        </button>
                    </div>
                    <p className="auth-link">Don't have an account? <Link href="/register">Sign up</Link></p>
                </div>
            </div>

            <Footer />
        </div>
    )

}