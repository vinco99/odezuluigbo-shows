"use client";

import { useState, useEffect } from "react";

interface EventTimelineProps {
    registrationStart?: string | Date | null;
    registrationEnd?: string | Date | null;
    eventDate?: string | Date | null;
}

export default function EventTimelineCountdown({
    registrationStart,
    registrationEnd,
    eventDate
}: EventTimelineProps) {
    const [timeLeft, setTimeLeft] = useState({ days: "00", hours: "00", mins: "00", secs: "00" });
    const [title, setTitle] = useState("⏳ Loading...");
    const [isEventOver, setIsEventOver] = useState(false);

    useEffect(() => {
        // Convert everything to timestamps (milliseconds). If null, it becomes NaN.
        const tRegStart = registrationStart ? new Date(registrationStart).getTime() : null;
        const tRegEnd = registrationEnd ? new Date(registrationEnd).getTime() : null;
        const tEvent = eventDate ? new Date(eventDate).getTime() : null;

        const updateTimer = () => {
            const now = new Date().getTime();
            let targetTime = null;
            let currentTitle = "";

            // Determine which milestone is NEXT in chronological order
            if (tRegStart && now < tRegStart) {
                targetTime = tRegStart;
                currentTitle = "⏳ Registration Opens In";
            } 
            else if (tRegEnd && now < tRegEnd) {
                targetTime = tRegEnd;
                currentTitle = "⏳ Registration Closes In";
            } 
            else if (tEvent && now < tEvent) {
                targetTime = tEvent;
                currentTitle = "⏳ Countdown to the Grand Event";
            } 
            else {
                // All dates have passed (or no dates provided)
                setIsEventOver(true);
                setTitle("Event Concluded");
                return;
            }

            setTitle(currentTitle);

            // Calculate the countdown to the targetTime
            const distance = targetTime - now;
            const d = Math.floor(distance / (1000 * 60 * 60 * 24));
            const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({
                days: String(d).padStart(2, "0"),
                hours: String(h).padStart(2, "0"),
                mins: String(m).padStart(2, "0"),
                secs: String(s).padStart(2, "0"),
            });
        };

        updateTimer(); // Run immediately
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [registrationStart, registrationEnd, eventDate]);

    // Fallback if no dates are provided at all
    if (!registrationStart && !registrationEnd && !eventDate) return null;

    return (
        <div className="pgnt-cd-box">
            <h3>{title}</h3>
            
            {isEventOver ? (
                <p style={{ marginTop: "12px", color: "var(--gold)", fontSize: "1.1rem" }}>
                    This event has officially ended.
                </p>
            ) : (
                <div className="cd-timer">
                    <div className="cd-unit">
                        <span>{timeLeft.days}</span>
                        <small>Days</small>
                    </div>
                    <div className="cd-sep">:</div>
                    <div className="cd-unit">
                        <span>{timeLeft.hours}</span>
                        <small>Hours</small>
                    </div>
                    <div className="cd-sep">:</div>
                    <div className="cd-unit">
                        <span>{timeLeft.mins}</span>
                        <small>Mins</small>
                    </div>
                    <div className="cd-sep">:</div>
                    <div className="cd-unit">
                        <span>{timeLeft.secs}</span>
                        <small>Secs</small>
                    </div>
                </div>
            )}
        </div>
    );
}