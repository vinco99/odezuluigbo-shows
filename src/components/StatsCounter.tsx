"use client";

import { useEffect, useRef, useState } from "react";

type StatsCounterProps = {
  value: string;
  suffix: string | null;
  animate: boolean;
};

export default function StatsCounter({
  value,
  suffix,
  animate,
}: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const target = Number(value);

  useEffect(() => {
    if (!animate || !Number.isFinite(target)) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [animate, target]);

  useEffect(() => {
    if (!animate || !started || !Number.isFinite(target)) return;

    const duration = 1400;
    let frameId = 0;
    let startTime: number | null = null;

    const tick = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

      // Ease-out animation
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(target * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [animate, started, target]);

  if (!animate) {
    return (
      <>
        <span className="stat-num">{value}</span>
        {suffix && <span className="stat-plus">{suffix}</span>}
      </>
    );
  }

  return (
    <>
      <span className="stat-num" ref={ref}>
        {count.toLocaleString()}
      </span>
      {suffix && <span className="stat-plus">{suffix}</span>}
    </>
  );
}