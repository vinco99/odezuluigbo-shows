"use client";
import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { showToast } from "@/components/Toast";
import { dashboardPath } from "@/lib/dashboard";


export default function LoginPage(){

    const [message,setMessage] = useState("");


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
                        <input className="auth-input" name="password" type="password" placeholder="Password" required />
                        <div className="auth-forgot">
                            <Link href="/contact">Forgot password?</Link>
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
                        <button className="social-btn apple" >
                        <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                        </svg>
                        Continue with Apple
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