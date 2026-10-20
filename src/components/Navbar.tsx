"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { redirect, usePathname } from "next/navigation";
import {motion} from "framer-motion";
import { signOut } from "next-auth/react";

type NavbarSession = { name: string | null; role: string; creditBalance: number } | null;

export default function Navbar({ session }: { session: NavbarSession }){

    const pathname = usePathname();

    const [scrolled,setScrolled] = useState(false);

    const [open,setOpen] = useState(false);


    useEffect(()=>{

        function handleScroll(){
            setScrolled(window.scrollY > 50);
        }

        window.addEventListener(
            "scroll",
            handleScroll
        );

        return ()=>{
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        }

    },[]);


    const links=[
        {name:"Home", href:"/"},

        {name:"Events", href:"/events"},

        {name:"Pageant", href:"/pageant"},

        {name:"Reality TV", href:"/reality-tv"},

        {name:"Vote", href:"/vote"},

        {name:"Blog", href:"/blog"},

        {name:"About", href:"/about"},

        {name:"Contact", href:"/contact"}
    ];

    function isActive(pathname: string, href: string): boolean {
        // "/" should only match the exact homepage, not every route
        if (href === "/") return pathname === "/";

        // Everything else matches the exact path, or any sub-path
        return pathname === href || pathname.startsWith(href + "/");
    };


    return (

        <nav id="navbar"
            className={scrolled? "scrolled":""}
        >

            <div className="nav-container">
                {/* LOGO */}
                <Link href="/" className="nav-logo" style={{ float: "right" }}>
                    <img src="/images/logo.webp" alt="Odezuluigbo" className="logo-mark" />
                    <div className="logo-text">
                        <span className="logo-main">ODEZULUIGBO</span>
                        <span className="logo-sub">SHOWS</span>
                    </div>
                </Link>


                {/* LINKS */}
                <ul id="navLinks"
                    className={open? "nav-links open": "nav-links"}
                >
                {
                    links.map(link=>(

                        <motion.li key={link.href}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            
                            <Link
                                href={link.href}
                                className={isActive(pathname, link.href) ? "active" : ""}
                                onClick={() => setOpen(false)}
                            >
                                {link.name}
                            </Link>

                        </motion.li>
                    ))
                }
                    <li>
                        {session ? 
                            <button className="nav-cta-mobile" onClick={() => signOut({ callbackUrl: "/" })} style={{
                                display: "none", fontFamily: "var(--fd)", fontSize: ".72rem", 
                                letterSpacing: ".15em", textTransform: "uppercase", color: "var(--black)", 
                                background: "linear-gradient(135deg,var(--gold-dark),var(--gold-light))", 
                                padding: "10px 20px", borderRadius: "4px", textAlign: "center", marginTop:"8px"
                            }}>Sign Out</button> :
                        <>
                            <Link className="nav-cta-mobile" href="/login" style={{
                                display: "none", fontFamily: "var(--fd)", fontSize: ".72rem", 
                                letterSpacing: ".15em", textTransform: "uppercase", color: "var(--black)", 
                                background: "linear-gradient(135deg,var(--gold-dark),var(--gold-light))", 
                                padding: "10px 20px", borderRadius: "4px", textAlign: "center", marginTop:"8px"
                            }}>Sign In</Link>

                            <div className="nav-register-moblie" style={{ display: "none"}}>
                                <Link href="/register" className="btn btn-outline btn-xs" style={{ textTransform: "uppercase"}}>Register</Link>
                            </div>
                        </>
                        }
                    </li>
                </ul>

                {session ? 
                    <div className="wallet-badge" onClick={()=> redirect("/dashboard")} style={{display: "flex", alignItems: "center", gap: "7px", background: "var(--g10)", border: "1px solid var(--g20)", borderRadius: "30px", padding: "8px 16px", cursor: "pointer", fontFamily: "var(--fd)", fontSize: ".72rem", letterSpacing: ".08em", color: "var(--gold)", whiteSpace: "nowrap", flexShrink: "1", minWidth: "0", maxWidth: "150px"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink: "0"}}><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
                        <span style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: "0"}}><span className="wallet-balance-display">{session.creditBalance}</span> Credits</span>
                    </div> : " "
                }

                {/* LOGIN */}
                {session ? (
                    <div className="nav-logout">
                        <button type="button" className="btn btn-ghost btn-sm" onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</button>
                    </div>
                ) : (
                    <>
                        <Link href="/login" className="nav-cta">Sign In</Link>
                        <div className="nav-logout">
                            <Link href="/register" className="btn btn-ghost btn-sm" style={{ textTransform: "uppercase"}}>Register</Link>
                        </div>
                    </>
                )}



                {/* HAMBURGER */}
                <button className="hamburger"
                onClick={()=>setOpen(!open)}
                >
                    <span className={open? "rotate1":""}/>
                    <span className={open? "hide":""}/>
                    <span className={open? "rotate2":""}/>
                </button>

            </div>

        </nav>

    )

}