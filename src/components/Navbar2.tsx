"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {motion} from "framer-motion";


export default function Navbar(){

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


    return (

        <nav id="navbar"
            className={scrolled? "scrolled":""}
        >

            <div className="nav-container">
                {/* LOGO */}
                <Link href="/" className="nav-logo">
                    <Image src="/images/logo.webp" alt="Odezuluigbo" className="logo-mark" />
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
                            
                            <Link href={link.href}
                                className={pathname === link.href? "active": ""}
                                onClick={()=>setOpen(false)}
                            >
                                {link.name}
                            </Link>

                        </motion.li>
                    ))
                }
                    <li className="mobile-login nav-cta-mobile">
                        <Link href="/login">Sign In</Link>
                    </li>
                </ul>

                {/* LOGIN */}
                <Link href="/login"
                    className="nav-cta"
                >
                    Sign In
                </Link>


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