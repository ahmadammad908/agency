"use client"
import { useState, useEffect, useRef, memo } from "react";

const STATS = [
  { number: 500, suffix: "+", label: "Happy Clients", icon: "😊" },
  { number: 8,   suffix: "+", label: "Services Offered", icon: "🧹" },
  { number: 5,   suffix: "★", label: "Average Rating", icon: "⭐" },
  { number: 100, suffix: "%", label: "Insured & Vetted", icon: "🛡️" },
] as const;

function useCountUp(target: number, duration = 1600, start = false): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = 0;
    let rafId: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * target));
      if (progress < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, start]);
  return count;
}

const StatItem = memo(function StatItem({
  number, suffix, label, icon, animate,
}: { number: number; suffix: string; label: string; icon: string; animate: boolean }) {
  const count = useCountUp(number, 1600, animate);
  return (
    <div className="stat-item">
      <div className="stat-icon-wrap">{icon}</div>
      <div className="stat-number">{animate ? count : number}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
});

export default function StatsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If already in viewport on mount, trigger immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);

    const fallback = setTimeout(() => setVisible(true), 2500);
    return () => { obs.disconnect(); clearTimeout(fallback); };
  }, []);

  // Scroll reveal for whole page (runs once, client-side only)
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    const timer = setTimeout(() => {
      document.querySelectorAll(".reveal, .reveal-scale").forEach((el) => obs.observe(el));
    }, 80);
    return () => { obs.disconnect(); clearTimeout(timer); };
  }, []);

  return (
    <div className="stats-bar" ref={ref}>
      <div className="stats-inner">
        {STATS.map((s, i) => (
          <div key={s.label} className={`reveal d${i + 1}`}>
            <StatItem {...s} animate={visible} />
          </div>
        ))}
      </div>
    </div>
  );
}