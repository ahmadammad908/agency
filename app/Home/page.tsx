import Header from "../../components/Header";
import Link from "next/link";
import { Send, PhoneCall, FileText, Calendar, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import StatsSection from "../../components/StatsSection";
import "../home.css"; // ← CSS bundled at build time, served with HTML = zero flash

// ── STATIC DATA ──────────────────────────────────────────────────────────────
const SERVICES = [
  { name: "Domestic Cleaning",  icon: "🧹", desc: "Regular home cleaning tailored to your routine and lifestyle.",         tag: "Most Popular"    },
  { name: "Commercial Cleaning",icon: "🏢", desc: "Professional standards for offices, shops and commercial spaces.",       tag: null              },
  { name: "Office Cleaning",    icon: "💼", desc: "Keep your workspace spotless, hygienic and productive.",                tag: null              },
  { name: "End of Tenancy",     icon: "🔑", desc: "Full deep clean to ensure you get your deposit back.",                  tag: "High Demand"     },
  { name: "Deep Cleaning",      icon: "✨", desc: "Thorough top-to-bottom clean for every corner of your property.",       tag: null              },
  { name: "After Builders",     icon: "🔨", desc: "Post-construction dust, debris and residue removed completely.",        tag: null              },
  { name: "Airbnb Cleaning",    icon: "🛎️", desc: "Fast, reliable turnovers to keep your guests rating 5 stars.",         tag: "Fast Turnaround" },
  { name: "Carpet Cleaning",    icon: "🪣", desc: "Deep extraction cleaning that restores carpets to like-new.",           tag: null              },
] as const;

const REASONS = [
  { icon: "🛡️", title: "Fully Insured",          desc: "Complete peace of mind — every job is covered by full public liability insurance." },
  { icon: "📅", title: "Flexible Scheduling",     desc: "We work around your timetable, including evenings and weekends."                  },
  { icon: "👥", title: "Reliable Local Team",     desc: "Friendly, background-checked professionals from your community."                  },
  { icon: "💷", title: "Competitive Prices",      desc: "Transparent pricing with no hidden fees. Quality that doesn't cost the earth."    },
  { icon: "🏆", title: "Customer First",          desc: "We're not done until you're completely satisfied with the result."                },
  { icon: "🏠", title: "Domestic & Commercial",   desc: "Whether it's your home or business, we have the right team for you."             },
] as const;

const TESTIMONIALS = [
  { name: "Sarah M.", location: "Rotherham", initials: "SM", color: "#0ea5e9",
    text: "Absolutely fantastic service. The team were on time, thorough, and left my home spotless. Will definitely book again!" },
  { name: "James T.", location: "Sheffield",  initials: "JT", color: "#8b5cf6",
    text: "Used M&L for our office end-of-lease clean. Landlord was impressed and we got our full deposit back. Highly recommend." },
  { name: "Lisa K.",  location: "Doncaster", initials: "LK", color: "#10b981",
    text: "Best Airbnb cleaning service I've used. Fast, reliable and they never let me down between guest bookings." },
] as const;

const CTA_CHECKS = [
  "Free quote within the hour",
  "Fully insured, vetted team",
  "No contracts — cancel anytime",
  "Serving all of South Yorkshire",
] as const;

// ── PAGE ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Header />

      <main className="page-wrapper">

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-grid">

            {/* Left copy */}
            <div>
              <span className="hero-eyebrow reveal" style={{ marginTop: "70px" }}>
                <MapPin size={14} style={{ color: "#38bdf8", flexShrink: 0 }} />
                Rotherham • Sheffield • Doncaster • Barnsley
              </span>
              <h1 className="hero-h1 reveal d1">
                Premium Cleaning Services<br />
                <span>You Can Actually Trust</span>
              </h1>
              <p className="hero-sub reveal d2">
                M&amp;L Cleaning Group delivers reliable, professional cleaning for homes and
                businesses across South Yorkshire — with no mess, no stress, and no hidden fees.
              </p>
              <div className="hero-btns reveal d3">
                <Link href="/free-quote" className="btn-primary"><FileText size={16} /> Get Free Quote</Link>
                <a href="tel:07407480239" className="btn-gold"><PhoneCall size={16} /> Call Now</a>
                <a href="https://wa.me/447407480239" target="_blank" rel="noreferrer" className="btn-whatsapp">
                  <Send size={16} /> WhatsApp
                </a>
              </div>
            </div>

            {/* Right card */}
            <div className="hero-card reveal-scale d2">
              <h2 className="hero-card-title">Book Your Clean Today</h2>
              <p className="hero-card-sub">Free, no-obligation quote. We'll get back to you within the hour.</p>
              <Link href="/booking" className="hero-card-cta">
                <Calendar size={18} /> Book Online Now
              </Link>
              <div className="trust-badges">
                <div className="trust-badge">Fully insured — public liability covered</div>
                <div className="trust-badge">Background-checked, vetted staff</div>
                <div className="trust-badge">No contracts — cancel anytime</div>
                <div className="trust-badge">5-star rated across South Yorkshire</div>
              </div>
            </div>
          </div>

          {/* Cloudy wave */}
          <div className="hero-wave">
            <svg viewBox="0 0 1440 130" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path
                d="M0,80 C30,65 60,95 100,78 C140,61 170,90 210,72 C250,54 280,88 320,70
                   C360,52 390,84 430,66 C470,48 510,82 550,68 C590,54 620,86 660,72
                   C700,58 730,88 770,74 C810,60 840,90 880,76 C920,62 950,92 990,76
                   C1030,60 1060,88 1100,72 C1140,56 1170,86 1210,70 C1250,54 1290,82 1330,68
                   C1370,54 1410,78 1440,65 L1440,130 L0,130 Z"
                fill="#ffffff"
              />
            </svg>
          </div>
        </section>

        {/* ── STATS — client island (count-up animation) ── */}
        <StatsSection />

        {/* ── WHY CHOOSE ── */}
        <section className="section-why">
          <div className="section-inner">
            <div className="why-header">
              <div className="reveal">
                <div className="why-eyebrow">Why M&amp;L Cleaning Group</div>
                <h2 className="why-title">The <em>Cleaner</em> Choice<br />for South Yorkshire</h2>
              </div>
              <div className="reveal d2">
                <p className="why-sub">
                  We built this business on trust, reliability and results — not promises.
                  Every team member is background-checked, every job is covered, and we're not
                  done until you're satisfied.
                </p>
                <Link href="/free-quote" className="why-cta-link">
                  See what we can do for you <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div className="reasons-grid">
              {REASONS.map((r, i) => (
                <div key={r.title} className={`reason-card reveal d${i + 1}`}>
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
              <Link href="/free-quote" className="services-all-link reveal d2">
                View all services <ArrowRight size={14} />
              </Link>
            </div>
            <div className="services-grid">
              {SERVICES.map((s, i) => (
                <Link href="/free-quote" key={s.name} className={`service-card reveal-scale d${(i % 4) + 1}`}>
                  {s.tag && <span className="service-tag">{s.tag}</span>}
                  <span className="service-icon">{s.icon}</span>
                  <h3 className="service-name">{s.name}</h3>
                  <p className="service-desc">{s.desc}</p>
                  <div className="service-footer">
                    <span className="service-link-text">Get a quote</span>
                    <div className="service-arrow"><ArrowRight /></div>
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
              {TESTIMONIALS.map((t, i) => (
                <div key={t.name} className={`testimonial-card reveal d${i + 1}`}>
                  <span className="testimonial-quote-mark" style={{ color: t.color, opacity: 0.15 }}>"</span>
                  <div className="stars-row">
                    {[1,2,3,4,5].map((s) => <span key={s} className="star-icon">★</span>)}
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
                Free, no-obligation quote. Most bookings confirmed within the hour.
                No contracts, no hidden fees.
              </p>
              <div className="cta-checklist">
                {CTA_CHECKS.map((item) => (
                  <div key={item} className="cta-check-item">
                    <CheckCircle2 size={16} /> {item}
                  </div>
                ))}
              </div>
              <div className="cta-btns">
                <Link href="/free-quote" className="btn-cta-primary"><FileText size={16} /> Get Free Quote</Link>
                <Link href="/booking"    className="btn-cta-outline"><Calendar  size={16} /> Book Online</Link>
              </div>
            </div>

            <div className="cta-right reveal d2">
              <div className="cta-contact-card">
                <div className="cta-contact-title">Prefer to reach out directly?</div>

                <a href="tel:07407480239" className="contact-option">
                  <div className="contact-option-icon" style={{ background: "rgba(245,158,11,.15)" }}>📞</div>
                  <div>
                    <div className="contact-option-label" style={{ color: "#f59e0b" }}>Call Us</div>
                    <div className="contact-option-value">07407 480239</div>
                  </div>
                </a>

                <div className="contact-divider" />

                <a href="https://wa.me/447407480239" target="_blank" rel="noreferrer" className="contact-option">
                  <div className="contact-option-icon" style={{ background: "rgba(37,211,102,.15)" }}>💬</div>
                  <div>
                    <div className="contact-option-label" style={{ color: "#25d366" }}>WhatsApp</div>
                    <div className="contact-option-value">Message Us Now</div>
                  </div>
                </a>

                <div className="contact-divider" />

                <a href="mailto:info@mlcleaninggroup.co.uk" className="contact-option">
                  <div className="contact-option-icon" style={{ background: "rgba(14,165,233,.15)" }}>✉️</div>
                  <div>
                    <div className="contact-option-label" style={{ color: "#38bdf8" }}>Email</div>
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