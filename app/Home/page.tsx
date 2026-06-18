"use client"
import Header from "../../components/Header";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Send, PhoneCall, FileText, Calendar, MapPin, ArrowRight, CheckCircle2, Star } from "lucide-react";

const services = [
  { name: "Domestic Cleaning", icon: "🧹", desc: "Regular home cleaning tailored to your routine and lifestyle.", tag: "Most Popular" },
  { name: "Commercial Cleaning", icon: "🏢", desc: "Professional standards for offices, shops and commercial spaces.", tag: null },
  { name: "Office Cleaning", icon: "💼", desc: "Keep your workspace spotless, hygienic and productive.", tag: null },
  { name: "End of Tenancy", icon: "🔑", desc: "Full deep clean to ensure you get your deposit back.", tag: "High Demand" },
  { name: "Deep Cleaning", icon: "✨", desc: "Thorough top-to-bottom clean for every corner of your property.", tag: null },
  { name: "After Builders", icon: "🔨", desc: "Post-construction dust, debris and residue removed completely.", tag: null },
  { name: "Airbnb Cleaning", icon: "🛎️", desc: "Fast, reliable turnovers to keep your guests rating 5 stars.", tag: "Fast Turnaround" },
  { name: "Carpet Cleaning", icon: "🪣", desc: "Deep extraction cleaning that restores carpets to like-new.", tag: null },
];

const stats = [
  { number: 500, suffix: "+", label: "Happy Clients", icon: "😊" },
  { number: 8, suffix: "+", label: "Services Offered", icon: "🧹" },
  { number: 5, suffix: "★", label: "Average Rating", icon: "⭐" },
  { number: 100, suffix: "%", label: "Insured & Vetted", icon: "🛡️" },
];

const reasons = [
  { icon: "🛡️", title: "Fully Insured", desc: "Complete peace of mind — every job is covered by full public liability insurance." },
  { icon: "📅", title: "Flexible Scheduling", desc: "We work around your timetable, including evenings and weekends." },
  { icon: "👥", title: "Reliable Local Team", desc: "Friendly, background-checked professionals from your community." },
  { icon: "💷", title: "Competitive Prices", desc: "Transparent pricing with no hidden fees. Quality that doesn't cost the earth." },
  { icon: "🏆", title: "Customer First", desc: "We're not done until you're completely satisfied with the result." },
  { icon: "🏠", title: "Domestic & Commercial", desc: "Whether it's your home or business, we have the right team for you." },
];

const testimonials = [
  { name: "Sarah M.", location: "Rotherham", initials: "SM", text: "Absolutely fantastic service. The team were on time, thorough, and left my home spotless. Will definitely book again!", rating: 5, color: "#0ea5e9" },
  { name: "James T.", location: "Sheffield", initials: "JT", text: "Used M&L for our office end-of-lease clean. Landlord was impressed and we got our full deposit back. Highly recommend.", rating: 5, color: "#8b5cf6" },
  { name: "Lisa K.", location: "Doncaster", initials: "LK", text: "Best Airbnb cleaning service I've used. Fast, reliable and they never let me down between guest bookings.", rating: 5, color: "#10b981" },
];

function useCountUp(target: number, duration: number = 1800, start: boolean = false) {
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let animationId: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        animationId = requestAnimationFrame(step);
      }
    };
    animationId = requestAnimationFrame(step);
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [target, duration, start]);
  return count;
}

function StatItem({ number, suffix, label, icon, animate }: {
  number: number;
  suffix: string;
  label: string;
  icon: string;
  animate: boolean;
}) {
  const count = useCountUp(number, 1600, animate);
  const displayCount = animate ? count : number;
  return (
    <div className="stat-item">
      <div className="stat-icon-wrap">{icon}</div>
      <div className="stat-number">{displayCount}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [statsVisible, setStatsVisible] = useState<boolean>(false);
  const statsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsLoaded(true);

    // Stats observer
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsVisible(true);
            statsObserver.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    // Scroll reveal observer
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal, .reveal-scale').forEach((el) => {
        revealObserver.observe(el);
      });
    }, 100);

    return () => {
      statsObserver.disconnect();
      revealObserver.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // Force stats to show after a delay if observer doesn't trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!statsVisible) {
        setStatsVisible(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [statsVisible]);

  if (!isLoaded) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'#0A1628', color:'#fff', fontFamily:"'Inter', sans-serif" }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ width:'50px', height:'50px', border:'4px solid rgba(255,255,255,0.1)', borderTop:'4px solid #0ea5e9', borderRadius:'50%', animation:'spin 1s linear infinite', margin:'0 auto 20px' }} />
          <p style={{ fontSize:'1.1rem', opacity:0.8 }}>Loading M&amp;L Cleaning...</p>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Space Grotesk', sans-serif; background: #fff; color: #0A1628; }

        /* ── PAGE LOAD — bottom to top slide ── */
        @keyframes slideInFromBottom {
          0% {
            transform: translateY(100vh);
            opacity: 0;
          }
          60% {
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .page-wrapper {
          animation: slideInFromBottom 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* ── SCROLL ANIMATIONS ── */
        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }
        .reveal-delay-5 { transition-delay: 0.5s; }
        .reveal-delay-6 { transition-delay: 0.6s; }
        .reveal-delay-7 { transition-delay: 0.7s; }

        .reveal-scale {
          opacity: 0;
          transform: scale(0.92) translateY(24px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal-scale.visible {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        /* ── HERO ── */
        .hero {
          background: linear-gradient(135deg, #0A1628 0%, #0f2547 50%, #0c3460 100%);
          position: relative; overflow: hidden; min-height: 92vh; display: flex; align-items: center;
        }
        .hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 70% 50%, rgba(14,165,233,0.18) 0%, transparent 65%);
        }
        .hero::after {
          content: ''; position: absolute; bottom: -2px; left: 0; right: 0; height: 80px;
          background: #fff; clip-path: polygon(0 100%, 100% 100%, 100% 0);
        }
        .hero-grid {
          max-width: 1200px; margin: 0 auto; padding: 80px 24px 120px;
          display: grid; grid-template-columns: 1fr 420px; gap: 64px; align-items: center; position: relative; z-index: 1;
        }
        @media (max-width: 900px) { .hero-grid { grid-template-columns: 1fr; padding: 60px 20px 100px; gap: 40px; } }
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          background: rgba(14,165,233,0.15); border: 1px solid rgba(14,165,233,0.3);
          color: #38bdf8; font-size: 12px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; padding: 6px 16px; border-radius: 100px; margin-bottom: 28px;
        }
        .hero-eyebrow .location-icon { width: 14px; height: 14px; color: #38bdf8; flex-shrink: 0; }
        .hero-h1 {
          font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 900; color: #fff;
          line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 24px;
        }
        .hero-h1 span {
          background: linear-gradient(90deg, #38bdf8, #0ea5e9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .hero-sub { font-size: 1.15rem; color: #94a3b8; line-height: 1.7; max-width: 520px; margin-bottom: 40px; }
        .hero-btns { display: flex; flex-wrap: wrap; gap: 12px; }
        .btn-primary {
          background: linear-gradient(135deg, #0ea5e9, #0284c7); color: #fff;
          padding: 14px 28px; border-radius: 12px; font-weight: 700; font-size: 0.95rem;
          text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
          box-shadow: 0 8px 24px rgba(14,165,233,0.35); transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(14,165,233,0.45); }
        .btn-gold {
          background: linear-gradient(135deg, #f59e0b, #d97706); color: #fff;
          padding: 14px 28px; border-radius: 12px; font-weight: 700; font-size: 0.95rem;
          text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
          box-shadow: 0 8px 24px rgba(245,158,11,0.3); transition: transform 0.2s;
        }
        .btn-gold:hover { transform: translateY(-2px); }
        .btn-whatsapp {
          background: linear-gradient(135deg, #25d366, #128c7e); color: #fff;
          padding: 14px 28px; border-radius: 12px; font-weight: 700; font-size: 0.95rem;
          text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
          box-shadow: 0 8px 24px rgba(37,211,102,0.3); transition: transform 0.2s;
        }
        .btn-whatsapp:hover { transform: translateY(-2px); }
        .hero-card {
          background: rgba(255,255,255,0.06); backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.12); border-radius: 24px;
          padding: 40px 36px; box-shadow: 0 32px 64px rgba(0,0,0,0.3);
        }
        .hero-card-title { font-size: 1.5rem; font-weight: 800; color: #fff; margin-bottom: 8px; }
        .hero-card-sub { color: #94a3b8; margin-bottom: 28px; font-size: 0.9rem; line-height: 1.6; }
        .hero-card-cta {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          background: linear-gradient(135deg, #0ea5e9, #0284c7); color: #fff;
          padding: 16px; border-radius: 12px; font-weight: 800; font-size: 1rem;
          text-decoration: none; margin-bottom: 20px; box-shadow: 0 8px 24px rgba(14,165,233,0.4);
        }
        .hero-card-cta .calendar-icon { width: 18px; height: 18px; }
        .trust-badges { display: flex; flex-direction: column; gap: 10px; }
        .trust-badge { display: flex; align-items: center; gap: 10px; color: #94a3b8; font-size: 0.83rem; font-weight: 500; }
        .trust-badge::before {
          content: '✓'; display: flex; align-items: center; justify-content: center;
          width: 20px; height: 20px; background: rgba(14,165,233,0.2); color: #38bdf8;
          border-radius: 50%; font-size: 11px; font-weight: 800; flex-shrink: 0;
        }

        /* ── STATS BAR ── */
        .stats-bar {
          background: #fff;
          padding: 0 24px 0;
        }
        .stats-inner {
          max-width: 1200px;
          margin: 0 auto;
          transform: translateY(-48px);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 700px) { .stats-inner { grid-template-columns: repeat(2, 1fr); } }
        .stat-item {
          background: #0A1628;
          border-radius: 20px;
          padding: 28px 20px 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 16px 40px rgba(10,22,40,0.2);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .stat-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 56px rgba(14,165,233,0.2);
        }
        .stat-item::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #0ea5e9, #38bdf8);
        }
        .stat-item::after {
          content: '';
          position: absolute;
          bottom: -30px; right: -20px;
          width: 80px; height: 80px;
          background: radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%);
          border-radius: 50%;
        }
        .stat-icon-wrap { font-size: 1.3rem; margin-bottom: 10px; opacity: 0.85; }
        .stat-number {
          font-size: 2.4rem; font-weight: 900; color: #fff;
          letter-spacing: -0.04em; line-height: 1; margin-bottom: 8px;
          font-variant-numeric: tabular-nums;
        }
        .stat-label { font-size: 0.72rem; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.1em; }

        /* ── WHY CHOOSE ── */
        .section-why { background: #fff; padding: 20px 24px 100px; }
        .section-inner { max-width: 1200px; margin: 0 auto; }
        .why-header {
          display: grid; grid-template-columns: 1fr 1fr; gap: 48px;
          align-items: end; margin-bottom: 64px;
        }
        @media (max-width: 768px) { .why-header { grid-template-columns: 1fr; gap: 20px; } }
        .why-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 800; letter-spacing: 0.15em;
          text-transform: uppercase; color: #0ea5e9; margin-bottom: 16px;
        }
        .why-eyebrow::before { content: ''; display: block; width: 24px; height: 2px; background: #0ea5e9; border-radius: 2px; }
        .why-title { font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 900; color: #0A1628; letter-spacing: -0.04em; line-height: 1.05; }
        .why-title em { font-style: normal; color: #0ea5e9; }
        .why-right { padding-bottom: 4px; }
        .why-sub { color: #64748b; font-size: 1rem; line-height: 1.75; margin-bottom: 28px; font-family: 'Inter', sans-serif; font-weight: 400; }
        .why-cta-link {
          display: inline-flex; align-items: center; gap: 8px; font-size: 0.875rem; font-weight: 700;
          color: #0A1628; text-decoration: none; border-bottom: 2px solid #0ea5e9;
          padding-bottom: 2px; transition: color 0.2s, gap 0.2s;
        }
        .why-cta-link:hover { color: #0ea5e9; gap: 12px; }
        .reasons-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px;
          background: #f1f5f9; border-radius: 24px; overflow: hidden;
        }
        @media (max-width: 900px) { .reasons-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .reasons-grid { grid-template-columns: 1fr; } }
        .reason-card {
          background: #fff; padding: 36px 32px; transition: background 0.25s;
          position: relative; overflow: hidden;
        }
        .reason-card:hover { background: #f8fafc; }
        .reason-card:hover .reason-icon-bg { opacity: 1; transform: scale(1); }
        .reason-icon-bg {
          position: absolute; bottom: -20px; right: -20px; font-size: 5rem;
          opacity: 0; transform: scale(0.7); transition: opacity 0.35s, transform 0.35s;
          pointer-events: none; filter: grayscale(0.3);
        }
        .reason-num { font-size: 0.7rem; font-weight: 800; letter-spacing: 0.12em; color: #cbd5e1; margin-bottom: 20px; font-family: 'Inter', sans-serif; }
        .reason-icon { font-size: 1.8rem; margin-bottom: 16px; display: block; }
        .reason-title { font-size: 1rem; font-weight: 800; color: #0A1628; margin-bottom: 10px; letter-spacing: -0.01em; }
        .reason-desc { font-size: 0.85rem; color: #64748b; line-height: 1.7; font-family: 'Inter', sans-serif; }

        /* ── SERVICES ── */
        .section-services { background: #0A1628; padding: 100px 24px; position: relative; overflow: hidden; }
        .section-services::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(ellipse at 15% 80%, rgba(14,165,233,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 85% 20%, rgba(139,92,246,0.06) 0%, transparent 50%);
        }
        .services-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          margin-bottom: 56px; gap: 32px; flex-wrap: wrap; position: relative; z-index: 1;
        }
        .services-eyebrow {
          font-size: 11px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase;
          color: #38bdf8; margin-bottom: 14px; display: flex; align-items: center; gap: 8px;
        }
        .services-eyebrow::before { content: ''; display: block; width: 24px; height: 2px; background: #38bdf8; border-radius: 2px; }
        .services-title { font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 900; color: #fff; letter-spacing: -0.04em; line-height: 1.05; }
        .services-title em { font-style: normal; color: #38bdf8; }
        .services-all-link {
          display: inline-flex; align-items: center; gap: 8px; font-size: 0.875rem; font-weight: 700;
          color: #94a3b8; text-decoration: none; white-space: nowrap; transition: color 0.2s, gap 0.2s; padding-bottom: 4px;
        }
        .services-all-link:hover { color: #38bdf8; gap: 12px; }
        .services-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; position: relative; z-index: 1;
        }
        @media (max-width: 1000px) { .services-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .services-grid { grid-template-columns: 1fr; } }
        .service-card {
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px; padding: 32px 24px; text-decoration: none; display: flex;
          flex-direction: column; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative; overflow: hidden;
        }
        .service-card::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(14,165,233,0.1) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.3s;
        }
        .service-card:hover { background: rgba(255,255,255,0.08); border-color: rgba(14,165,233,0.4); transform: translateY(-6px); box-shadow: 0 24px 48px rgba(0,0,0,0.4); }
        .service-card:hover::after { opacity: 1; }
        .service-card:hover .service-arrow { transform: translate(4px, -4px); }
        .service-tag {
          position: absolute; top: 16px; right: 16px;
          background: rgba(14,165,233,0.2); border: 1px solid rgba(14,165,233,0.3);
          color: #38bdf8; font-size: 10px; font-weight: 800; letter-spacing: 0.08em;
          text-transform: uppercase; padding: 3px 10px; border-radius: 100px;
        }
        .service-icon { font-size: 2rem; margin-bottom: 20px; position: relative; z-index: 1; }
        .service-name { font-size: 1.05rem; font-weight: 800; color: #fff; margin-bottom: 10px; letter-spacing: -0.01em; position: relative; z-index: 1; }
        .service-desc { font-size: 0.82rem; color: #64748b; line-height: 1.7; flex: 1; margin-bottom: 24px; font-family: 'Inter', sans-serif; position: relative; z-index: 1; }
        .service-footer { display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 1; }
        .service-link-text { font-size: 0.82rem; font-weight: 700; color: #38bdf8; }
        .service-arrow {
          width: 28px; height: 28px; background: rgba(14,165,233,0.15); border-radius: 50%;
          display: flex; align-items: center; justify-content: center; transition: transform 0.25s;
        }
        .service-arrow svg { width: 13px; height: 13px; color: #38bdf8; }

        /* ── TESTIMONIALS ── */
        .section-testimonials { background: #f8fafc; padding: 100px 24px; }
        .testimonials-header { text-align: center; margin-bottom: 64px; }
        .testimonials-eyebrow {
          font-size: 11px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase;
          color: #0ea5e9; margin-bottom: 14px; display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .testimonials-title { font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 900; color: #0A1628; letter-spacing: -0.04em; line-height: 1.05; margin-bottom: 16px; }
        .testimonials-sub { color: #64748b; font-size: 1rem; max-width: 480px; margin: 0 auto; line-height: 1.7; font-family: 'Inter', sans-serif; font-weight: 400; }
        .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; align-items: start; }
        @media (max-width: 900px) { .testimonials-grid { grid-template-columns: 1fr; } }
        .testimonial-card {
          background: #fff; border-radius: 24px; padding: 40px 36px 36px; position: relative;
          border: 1px solid #e2e8f0; box-shadow: 0 4px 24px rgba(0,0,0,0.04);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .testimonial-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(0,0,0,0.08); }
        .testimonial-card:nth-child(2) { margin-top: 32px; }
        @media (max-width: 900px) { .testimonial-card:nth-child(2) { margin-top: 0; } }
        .testimonial-quote-mark { font-size: 6rem; line-height: 0.5; font-family: Georgia, serif; font-weight: 900; margin-bottom: 24px; display: block; }
        .stars-row { display: flex; gap: 3px; margin-bottom: 20px; }
        .star-icon { color: #f59e0b; font-size: 0.95rem; }
        .testimonial-text { color: #374151; font-size: 0.95rem; line-height: 1.8; margin-bottom: 28px; font-family: 'Inter', sans-serif; font-weight: 400; }
        .testimonial-author-row { display: flex; align-items: center; gap: 14px; }
        .testimonial-avatar { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 800; color: #fff; flex-shrink: 0; }
        .testimonial-name { font-weight: 800; font-size: 0.9rem; color: #0A1628; }
        .testimonial-loc { font-size: 0.78rem; color: #94a3b8; margin-top: 2px; font-family: 'Inter', sans-serif; }

        /* ── CTA ── */
        .section-cta {
          background: #0A1628;
          padding: 0 24px;
          position: relative;
          overflow: hidden;
        }
        .section-cta::before {
          content: '';
          position: absolute;
          top: -100px;
          right: -100px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 65%);
          pointer-events: none;
        }
        .cta-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 768px) {
          .cta-inner {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }
        .cta-left {
          padding: 100px 64px 100px 0;
          border-right: 1px solid rgba(255,255,255,0.06);
        }
        @media (max-width: 768px) {
          .cta-left {
            padding: 64px 0 40px;
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.06);
          }
        }
        .cta-eyebrow {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #38bdf8;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cta-eyebrow::before {
          content: '';
          display: block;
          width: 24px;
          height: 2px;
          background: #38bdf8;
          border-radius: 2px;
        }
        .cta-title {
          font-size: clamp(2.2rem, 3.5vw, 3.2rem);
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.04em;
          line-height: 1.05;
          margin-bottom: 20px;
        }
        .cta-title em {
          font-style: normal;
          color: #38bdf8;
        }
        .cta-sub {
          color: #64748b;
          font-size: 1rem;
          line-height: 1.75;
          margin-bottom: 40px;
          font-family: 'Inter', sans-serif;
        }
        .cta-checklist {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 44px;
        }
        .cta-check-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #94a3b8;
          font-size: 0.875rem;
          font-family: 'Inter', sans-serif;
        }
        .cta-check-item svg {
          color: #38bdf8;
          flex-shrink: 0;
          width: 16px;
          height: 16px;
        }
        .cta-btns {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        @media (max-width: 480px) {
          .cta-btns {
            flex-direction: column;
            width: 100%;
          }
          .cta-btns a {
            width: 100%;
            justify-content: center;
          }
        }
        .btn-cta-primary {
          background: linear-gradient(135deg, #0ea5e9, #0284c7);
          color: #fff;
          padding: 16px 32px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 0.95rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 8px 24px rgba(14,165,233,0.35);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(14,165,233,0.45);
        }
        .btn-cta-outline {
          background: transparent;
          color: #94a3b8;
          border: 1px solid rgba(255,255,255,0.12);
          padding: 15px 28px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-cta-outline:hover {
          border-color: rgba(255,255,255,0.3);
          color: #fff;
        }
        .cta-right {
          padding: 100px 0 100px 64px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        @media (max-width: 768px) {
          .cta-right {
            padding: 40px 0 64px;
          }
        }
        .cta-contact-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 40px 36px;
        }
        @media (max-width: 480px) {
          .cta-contact-card {
            padding: 28px 20px;
          }
        }
        .cta-contact-title {
          font-size: 1rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 28px;
          letter-spacing: -0.01em;
        }
        .contact-option {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 20px;
          border-radius: 14px;
          text-decoration: none;
          margin-bottom: 12px;
          transition: background 0.2s;
        }
        .contact-option:last-child {
          margin-bottom: 0;
        }
        .contact-option:hover {
          background: rgba(255,255,255,0.05);
        }
        .contact-option-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
        }
        .contact-option-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 3px;
          font-family: 'Inter', sans-serif;
        }
        .contact-option-value {
          font-size: 0.95rem;
          font-weight: 800;
          color: #fff;
        }
        @media (max-width: 480px) {
          .contact-option-value {
            font-size: 0.85rem;
          }
          .contact-option {
            padding: 14px 16px;
            gap: 12px;
          }
          .contact-option-icon {
            width: 38px;
            height: 38px;
            font-size: 0.95rem;
          }
        }
        .contact-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 20px 0;
        }
        .response-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(16,185,129,0.12);
          border: 1px solid rgba(16,185,129,0.2);
          color: #10b981;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 100px;
          margin-top: 20px;
        }
        @media (max-width: 480px) {
          .response-tag {
            font-size: 0.7rem;
            padding: 6px 14px;
          }
        }
        .response-dot {
          width: 7px;
          height: 7px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.75); }
        }
      `}</style>

      <Header />

      <main className="page-wrapper">
        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-grid">
            <div>
              <span className="hero-eyebrow reveal" style={{ marginTop: "70px" }}>
                <MapPin className="location-icon" />
                Rotherham • Sheffield • Doncaster • Barnsley
              </span>
              <h1 className="hero-h1 reveal reveal-delay-1">
                Premium Cleaning Services<br />
                <span>You Can Actually Trust</span>
              </h1>
              <p className="hero-sub reveal reveal-delay-2">
                M&amp;L Cleaning Group delivers reliable, professional cleaning for homes and businesses across South Yorkshire — with no mess, no stress, and no hidden fees.
              </p>
              <div className="hero-btns reveal reveal-delay-3">
                <Link href="/free-quote" className="btn-primary"><FileText /> Get Free Quote</Link>
                <a href="tel:07407480239" className="btn-gold"><PhoneCall /> Call Now</a>
                <a href="https://wa.me/447407480239" target="_blank" rel="noreferrer" className="btn-whatsapp"><Send /> WhatsApp</a>
              </div>
            </div>
            <div className="hero-card reveal-scale reveal-delay-2">
              <h2 className="hero-card-title">Book Your Clean Today</h2>
              <p className="hero-card-sub">Free, no-obligation quote. We'll get back to you within the hour.</p>
              <Link href="/booking" className="hero-card-cta">
                <Calendar className="calendar-icon" />
                Book Online Now
              </Link>
              <div className="trust-badges">
                <div className="trust-badge">Fully insured — public liability covered</div>
                <div className="trust-badge">Background-checked, vetted staff</div>
                <div className="trust-badge">No contracts — cancel anytime</div>
                <div className="trust-badge">5-star rated across South Yorkshire</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="stats-bar" ref={statsRef}>
          <div className="stats-inner">
            {stats.map((s, i) => (
              <div key={s.label} className={`reveal reveal-delay-${i + 1}`}>
                <StatItem {...s} animate={statsVisible} />
              </div>
            ))}
          </div>
        </div>

        {/* ── WHY CHOOSE ── */}
        <section className="section-why">
          <div className="section-inner">
            <div className="why-header">
              <div className="reveal">
                <div className="why-eyebrow">Why M&amp;L Cleaning Group</div>
                <h2 className="why-title">The <em>Cleaner</em> Choice<br />for South Yorkshire</h2>
              </div>
              <div className="why-right reveal reveal-delay-2">
                <p className="why-sub">
                  We built this business on trust, reliability and results — not promises. Every team member is background-checked, every job is covered, and we're not done until you're satisfied.
                </p>
                <Link href="/free-quote" className="why-cta-link">
                  See what we can do for you <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div className="reasons-grid">
              {reasons.map((r, i) => (
                <div key={r.title} className={`reason-card reveal reveal-delay-${i + 1}`}>
                  <div className="reason-num">0{i + 1}</div>
                  <span className="reason-icon">{r.icon}</span>
                  <div className="reason-icon-bg">{r.icon}</div>
                  <h3 className="reason-title">{r.title}</h3>
                  <p className="reason-desc">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="section-services">
          <div className="section-inner">
            <div className="services-header">
              <div className="reveal">
                <div className="services-eyebrow">What We Offer</div>
                <h2 className="services-title">Every Clean.<br /><em>Covered.</em></h2>
              </div>
              <Link href="/free-quote" className="services-all-link reveal reveal-delay-2">
                View all services <ArrowRight size={14} />
              </Link>
            </div>
            <div className="services-grid">
              {services.map((s, i) => (
                <Link href="/free-quote" key={s.name} className={`service-card reveal-scale reveal-delay-${(i % 4) + 1}`}>
                  {s.tag && <span className="service-tag">{s.tag}</span>}
                  <span className="service-icon">{s.icon}</span>
                  <h3 className="service-name">{s.name}</h3>
                  <p className="service-desc">{s.desc}</p>
                  <div className="service-footer">
                    <span className="service-link-text">Get a quote</span>
                    <div className="service-arrow">
                      <ArrowRight />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="section-testimonials">
          <div className="section-inner">
            <div className="testimonials-header reveal">
              <div className="testimonials-eyebrow">★ Real Reviews</div>
              <h2 className="testimonials-title">What Our Clients Say</h2>
              <p className="testimonials-sub">
                Don't take our word for it — here's what customers across South Yorkshire have to say.
              </p>
            </div>
            <div className="testimonials-grid">
              {testimonials.map((t, i) => (
                <div key={t.name} className={`testimonial-card reveal reveal-delay-${i + 1}`}>
                  <span className="testimonial-quote-mark" style={{ color: t.color, opacity: 0.15 }}>"</span>
                  <div className="stars-row">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <span key={idx} className="star-icon">★</span>
                    ))}
                  </div>
                  <p className="testimonial-text">{t.text}</p>
                  <div className="testimonial-author-row">
                    <div className="testimonial-avatar" style={{ background: t.color }}>{t.initials}</div>
                    <div>
                      <div className="testimonial-name">{t.name}</div>
                      <div className="testimonial-loc">{t.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section-cta">
          <div className="cta-inner">
            <div className="cta-left reveal">
              <div className="cta-eyebrow">Get Started Today</div>
              <h2 className="cta-title">Ready for a<br /><em>Spotless</em> Space?</h2>
              <p className="cta-sub">
                Free, no-obligation quote. Most bookings confirmed within the hour. No contracts, no hidden fees.
              </p>
              <div className="cta-checklist">
                {["Free quote within the hour", "Fully insured, vetted team", "No contracts — cancel anytime", "Serving all of South Yorkshire"].map(item => (
                  <div key={item} className="cta-check-item">
                    <CheckCircle2 />
                    {item}
                  </div>
                ))}
              </div>
              <div className="cta-btns">
                <Link href="/free-quote" className="btn-cta-primary"><FileText size={16} /> Get Free Quote</Link>
                <Link href="/booking" className="btn-cta-outline"><Calendar size={16} /> Book Online</Link>
              </div>
            </div>
            <div className="cta-right reveal reveal-delay-2">
              <div className="cta-contact-card">
                <div className="cta-contact-title">Prefer to reach out directly?</div>
                <a href="tel:07407480239" className="contact-option">
                  <div className="contact-option-icon" style={{ background: 'rgba(245,158,11,0.15)' }}>📞</div>
                  <div>
                    <div className="contact-option-label" style={{ color: '#f59e0b' }}>Call Us</div>
                    <div className="contact-option-value">07407 480239</div>
                  </div>
                </a>
                <div className="contact-divider" />
                <a href="https://wa.me/447407480239" target="_blank" rel="noreferrer" className="contact-option">
                  <div className="contact-option-icon" style={{ background: 'rgba(37,211,102,0.15)' }}>💬</div>
                  <div>
                    <div className="contact-option-label" style={{ color: '#25d366' }}>WhatsApp</div>
                    <div className="contact-option-value">Message Us Now</div>
                  </div>
                </a>
                <div className="contact-divider" />
                <a href="mailto:info@mlcleaninggroup.co.uk" className="contact-option">
                  <div className="contact-option-icon" style={{ background: 'rgba(14,165,233,0.15)' }}>✉️</div>
                  <div>
                    <div className="contact-option-label" style={{ color: '#38bdf8' }}>Email</div>
                    <div className="contact-option-value">info@mlcleaninggroup.co.uk</div>
                  </div>
                </a>
                <div className="response-tag">
                  <div className="response-dot" />
                  Typically responds within 60 minutes
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}