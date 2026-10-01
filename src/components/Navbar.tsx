"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {motion} from "framer-motion";
import { signOut } from "next-auth/react";
import { dashboardPath } from "@/lib/dashboard";

type NavbarSession = { name: string | null; role: string } | null;

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
                <Link href="/" className="nav-logo">
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
                    <li className="mobile-login nav-cta-mobile">
                        {session ? <Link href={dashboardPath(session.role)}>{session.name ?? "Dashboard"}</Link> : " "}
                    </li>
                </ul>

                {/* LOGIN */}
                {session ? (
                    <div className="flex items-center gap-2">
                        <Link href={dashboardPath(session.role)} className="nav-cta">Dashboard</Link>
                        <button type="button" className="btn btn-ghost btn-xs" onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</button>
                    </div>
                ) : (
                    <Link href="/login" className="nav-cta">Sign In</Link>
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