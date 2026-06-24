"use client"
import React, { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

interface NavbarProps {
    session: any;
}

export default function Navbar({ session }: NavbarProps){

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const userRole = session?.user.role

    function capitalizeFirstLetter(text: string): string {
        if (!text) return "";
            return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }

    const role = capitalizeFirstLetter(userRole);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };


    if (!session) {
        return (
            <nav className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 fixed top-0 w-full z-50 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                            
                        {/*Logo / Brand Title*/}
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-black tracking-wider bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent uppercase">
                                Odezuluigbo
                            </span>
                        </div>

                        {/*Desktop Navigation Items*/}
                        <div className="hidden md:flex items-center space-x-6">
                            <Link href="/dashboard" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
                                Dashboard
                            </Link>
                            <Link href="/profile" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
                                Profile
                            </Link>
                                
                            {/*Role Display Badge*/}
                            <div className="flex items-center space-x-2 bg-purple-950/50 border border-purple-500/30 px-3 py-1 rounded-full">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                <span className="text-xs font-semibold tracking-wider text-purple-300">
                                    Role: {role}
                                </span>
                            </div>

                            {/*Logout Button*/}
                            <button
                                onClick={() => redirect("/login")}
                                className="text-sm font-medium bg-yellow-600/10 hover:bg-yellow-600 text-yellow-400 hover:text-white border border-yellow-500/20 px-4 py-2 rounded-lg transition-all duration-200 shadow-sm shadow-yellow-900/20"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => redirect("/register")}
                                className="text-sm font-medium bg-purple-600/10 hover:bg-purple-600 text-purple-400 hover:text-white border border-purple-500/20 px-4 py-2 rounded-lg transition-all duration-200 shadow-sm shadow-purple-900/20"
                            >
                                register
                            </button>
                        </div>

                        {/*Mobile Menu Button*/}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={toggleMobileMenu}
                                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none" 
                                aria-expanded={isMobileMenuOpen}
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/*Mobile Menu Panel*/}
                <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden bg-slate-900/95 border-b border-slate-800 px-4 pt-2 pb-4 space-y-3 shadow-xl`}>
                    <button
                        onClick={() => redirect("/login")}
                        className="w-full text-left text-base font-medium text-yellow-400 hover:bg-yellow-950/30 py-2 rounded-md"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => redirect("/register")}
                        className="w-full text-left text-base font-medium text-white hover:bg-purple-950/30 py-2 rounded-md"
                    >
                        Register
                    </button>
                </div>
                
            </nav>

        );
    }
    else {
        return (

            <nav className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 fixed top-0 w-full z-50 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        
                        {/*Logo / Brand Title*/}
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-black tracking-wider bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent uppercase">
                                Odezuluigbo
                            </span>
                        </div>

                        {/*Desktop Navigation Items*/}
                        <div className="hidden md:flex items-center space-x-6">
                            <Link href="/dashboard" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
                                Dashboard
                            </Link>
                            <Link href="/profile" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
                                Profile
                            </Link>
                            
                            {/*Role Display Badge*/}
                            <div className="flex items-center space-x-2 bg-purple-950/50 border border-purple-500/30 px-3 py-1 rounded-full">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                <span className="text-xs font-semibold tracking-wider text-purple-300">
                                    Role: {role}
                                </span>
                            </div>

                            {/*Logout Button*/}
                            <button
                                onClick={async () => {
                                    await signOut({
                                        redirect: true,
                                        callbackUrl:"/" 
                                    });
                                }}
                                className="text-sm font-medium bg-rose-600/10 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/20 px-4 py-2 rounded-lg transition-all duration-200 shadow-sm shadow-rose-900/20"
                            >
                                Logout
                            </button>
                        </div>

                        {/*Mobile Menu Button*/}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={toggleMobileMenu}
                                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none" 
                                aria-expanded={isMobileMenuOpen}
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/*Mobile Menu Panel*/}
                <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden bg-slate-900/95 border-b border-slate-800 px-4 pt-2 pb-4 space-y-3 shadow-xl`}>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">Current Session</span>
                        <span className="text-xs bg-purple-950/80 border border-purple-500/30 px-2 py-0.5 rounded text-purple-300">{role}</span>
                    </div>
                    <Link href="/dashboard" className="block text-base font-medium text-slate-300 hover:text-white py-2 rounded-md">Dashboard</Link>
                    <Link href="/profile" className="block text-base font-medium text-slate-300 hover:text-white py-2 rounded-md">Profile</Link>

                    <button
                        onClick={async () => {
                            await signOut({
                                redirect: true,
                                callbackUrl:"/" 
                            });
                        }}
                        className="w-full text-left text-base font-medium text-rose-400 hover:bg-rose-950/30 py-2 rounded-md"
                    >
                        Logout
                    </button>
                </div>
            </nav>

        );

    }
}
