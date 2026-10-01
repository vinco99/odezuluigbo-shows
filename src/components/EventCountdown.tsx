"use client";

import { useEffect, useState } from "react";

export default function EventCountdown({ target }: { target: string | null }) {
  const [remaining, setRemaining] = useState("");
  useEffect(() => {
    if (!target) return;
    const update = () => {
      const difference = new Date(target).getTime() - Date.now();
      if (difference <= 0) return setRemaining("Event started");
      const days = Math.floor(difference / 86400000);
      const hours = Math.floor(difference / 3600000) % 24;
      const minutes = Math.floor(difference / 60000) % 60;
      const seconds = Math.floor(difference / 1000) % 60;
      setRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [target]);
  return <strong>{remaining || "Date to be announced"}</strong>;
}
