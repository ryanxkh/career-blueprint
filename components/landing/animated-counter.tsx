"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  label: string;
}

export function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState("\u00A0");
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateValue(value, setDisplay);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-3 text-center">
      <div className="rounded-xl bg-white/[0.08] px-6 py-3 backdrop-blur-sm">
        <span className="font-display text-4xl text-white md:text-5xl">
          {display}
        </span>
      </div>
      <span className="text-sm tracking-wide text-stone-300 md:text-base">
        {label}
      </span>
    </div>
  );
}

function animateValue(target: string, setDisplay: (v: string) => void) {
  const match = target.match(/^([^\d]*)([\d.]+)(.*)$/);
  if (!match) {
    setDisplay(target);
    return;
  }

  const prefix = match[1];
  const numericTarget = parseFloat(match[2]);
  const suffix = match[3];
  const isDecimal = match[2].includes(".");
  const decimalPlaces = isDecimal ? (match[2].split(".")[1]?.length ?? 0) : 0;

  const duration = 1500;
  const fps = 60;
  const totalFrames = Math.round(duration / (1000 / fps));
  let frame = 0;

  const counter = setInterval(() => {
    frame++;
    const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
    const current = numericTarget * progress;

    if (frame >= totalFrames) {
      setDisplay(
        `${prefix}${isDecimal ? numericTarget.toFixed(decimalPlaces) : Math.round(numericTarget)}${suffix}`
      );
      clearInterval(counter);
    } else {
      setDisplay(
        `${prefix}${isDecimal ? current.toFixed(decimalPlaces) : Math.round(current)}${suffix}`
      );
    }
  }, 1000 / fps);
}
