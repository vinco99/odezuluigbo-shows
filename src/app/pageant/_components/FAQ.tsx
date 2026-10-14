"use client";

import { useState } from "react";

export type FaqItem = { q: string; a: string };

const DEFAULT_FAQ: FaqItem[] = [
  {
    q: "Can diaspora Igbo women apply?",
    a: "Yes! Igbo women in the diaspora are warmly welcome to apply. You must have valid Nigerian documentation and proof of Igbo heritage.",
  },
  {
    q: "When is the registration deadline?",
    a: "Registration closes 30 days before the event. We encourage early registration as slots are limited.",
  },
  {
    q: "How are contestants scored?",
    a: "Scoring: Public voting (40%) + Judges scoring (40%) + Social media engagement (20%). All criteria are transparent.",
  },
  {
    q: "What does the registration fee cover?",
    a: "Covers your event package, training sessions, professional photoshoot, branding materials, and all pre-event activities.",
  },
  {
    q: "Are there prizes besides the grand prize?",
    a: "Yes — prizes for 1st & 2nd Runner Up, Best Traditional Wear, Most Intelligent, Most Talented, and People's Choice Award.",
  },
];

export default function FAQ({ items = DEFAULT_FAQ }: { items?: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const answerId = `faq-ans-${i}`;

        return (
          <div
            key={i}
            className={`faq-item ${isOpen ? "active" : ""}`}
          >
            <button
              type="button"
              className="faq-q"
              aria-expanded={isOpen}
              aria-controls={answerId}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              style={{
                width: "100%",
                background: "transparent",
                border: 0,
                cursor: "pointer",
                textAlign: "left",
                padding: 0,
                font: "inherit",
                color: "inherit",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <span>{item.q}</span>
              <span className="faq-icon" aria-hidden="true">
                {isOpen ? "−" : "+"}
              </span>
            </button>

            <div id={answerId} className="faq-ans" hidden={!isOpen}>
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}