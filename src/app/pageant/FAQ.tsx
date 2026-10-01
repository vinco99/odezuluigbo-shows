'use client'

import { useState } from "react";

export default function FAQ(){
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="faq-list">
                        
            <div className={`faq-item ${openIndex === 0 ? 'active' : ''}`}>
                <div className="faq-q" onClick={() => toggleFaq(0)}>
                    Can diaspora Igbo women apply? {' '}
                    <span className="faq-icon">{openIndex === 0 ? '-' : '+'}</span>
                </div>
                {openIndex === 0 && (
                    <div className="faq-ans">
                        <p>Yes! Igbo women in the diaspora are warmly welcome to apply. You must have valid Nigerian documentation and proof of Igbo heritage.</p>
                    </div>
                )}
            </div>

            <div className={`faq-item ${openIndex === 1 ? 'active' : ''}`}>
                <div className="faq-q" onClick={() => toggleFaq(1)}>
                    When is the registration deadline? {' '}
                    <span className="faq-icon">{openIndex === 1 ? '-' : '+'}</span>
                </div>
                {openIndex === 1 && (
                    <div className="faq-ans">
                        <p>Registration closes October 31, 2025 — 30 days before the event. We encourage early registration as slots are limited.</p>
                    </div>
                )}
            </div>

            <div className={`faq-item ${openIndex === 2 ? 'active' : ''}`}>
                <div className="faq-q" onClick={() => toggleFaq(2)}>
                    How are contestants scored? {' '}
                    <span className="faq-icon">{openIndex === 2 ? '-' : '+'}</span>
                </div>
                {openIndex === 2 && (
                    <div className="faq-ans">
                        <p>Scoring: Public voting (40%) + Judges scoring (40%) + Social media engagement (20%). All criteria are transparent.</p>
                    </div>
                )}
            </div>

            <div className={`faq-item ${openIndex === 3 ? 'active' : ''}`}>
                <div className="faq-q" onClick={() => toggleFaq(3)}>
                    What does the ₦15,000 fee cover? {' '}
                    <span className="faq-icon">{openIndex === 3 ? '-' : '+'}</span>
                </div>
                {openIndex === 3 && (
                    <div className="faq-ans">
                        <p>Covers your event package, training sessions, professional photoshoot, branding materials, and all pre-event activities.</p>
                    </div>
                )}
            </div>

            <div className={`faq-item ${openIndex === 4 ? 'active' : ''}`}>
                <div className="faq-q" onClick={() => toggleFaq(4)}>
                    Are there prizes besides the grand prize? {' '}
                    <span className="faq-icon">{openIndex === 4 ? '-' : '+'}</span>
                </div>
                {openIndex === 4 && (
                    <div className="faq-ans">
                        <p>Yes — prizes for 1st & 2nd Runner Up, Best Traditional Wear, Most Intelligent, Most Talented, and People's Choice Award.</p>
                    </div>
                )}
            </div>
        </div>
    );
 
}