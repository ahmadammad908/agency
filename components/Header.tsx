"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style jsx global>{`
        

        .ml-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: background 0.35s ease, box-shadow 0.35s ease;
          background: rgba(10, 22, 40, 0.88);
          backdrop-filter: blur(14px);
        }
        .ml-header.scrolled {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          box-shadow: 0 1px 0 rgba(0,0,0,0.07), 0 8px 32px rgba(0,0,0,0.08);
        }
        .ml-header-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        /* LOGO */
        .ml-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .ml-logo-icon {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #0ea5e9, #0284c7);
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: #fff;
          box-shadow: 0 4px 12px rgba(14,165,233,0.4);
          flex-shrink: 0;
        }
        .ml-logo-name {
          font-size: 1rem;
          font-weight: 900;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: #fff;
          transition: color 0.35s;
        }
        .ml-logo-tagline {
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          transition: color 0.35s;
        }
        .ml-header.scrolled .ml-logo-name    { color: #0A1628; }
        .ml-header.scrolled .ml-logo-tagline { color: #94a3b8; }

        /* NAV */
        .ml-nav {
          display: flex;
          align-items: center;
          gap: 2px;
          flex: 1;
          justify-content: center;
        }
        .ml-nav-link {
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 600;
          padding: 7px 13px;
          border-radius: 8px;
          color: rgba(255,255,255,0.85);
          transition: all 0.2s;
        }
        .ml-nav-link:hover {
          color: #fff;
          background: rgba(255,255,255,0.1);
        }
        .ml-header.scrolled .ml-nav-link       { color: #475569; }
        .ml-header.scrolled .ml-nav-link:hover { color: #0A1628; background: #f1f5f9; }

        /* ACTIONS */
        .ml-header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        /* Contact Us button — glowing gradient border */
        .ml-contact-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.85rem;
          font-weight: 700;
          text-decoration: none;
          padding: 9px 18px;
          border-radius: 10px;
          color: #fff;
          white-space: nowrap;
          letter-spacing: 0.01em;
          position: relative;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.22);
          transition: all 0.25s;
          overflow: hidden;
        }
        /* shimmer sweep on hover */
        .ml-contact-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.18), transparent);
          transition: left 0.45s ease;
        }
        .ml-contact-btn:hover::before { left: 130%; }
        .ml-contact-btn:hover {
          background: rgba(255,255,255,0.14);
          border-color: rgba(255,255,255,0.55);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.15), 0 4px 16px rgba(0,0,0,0.2);
          transform: translateY(-1px);
        }
        /* scrolled: warm amber-gold gradient border effect */
        .ml-header.scrolled .ml-contact-btn {
          color: #0A1628;
          background: #fff;
          border-color: transparent;
          box-shadow: 0 0 0 1.5px #0ea5e9, 0 2px 10px rgba(14,165,233,0.15);
        }
        .ml-header.scrolled .ml-contact-btn:hover {
          background: linear-gradient(135deg, #eff9ff, #e0f2fe);
          box-shadow: 0 0 0 1.5px #0284c7, 0 4px 16px rgba(14,165,233,0.25);
          color: #0284c7;
          transform: translateY(-1px);
        }

        /* Free Quote — solid gradient CTA */
        .ml-quote-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: linear-gradient(135deg, #0ea5e9, #0284c7);
          color: #fff !important;
          font-size: 0.875rem;
          font-weight: 700;
          padding: 9px 20px;
          border-radius: 10px;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(14,165,233,0.45);
          transition: transform 0.2s, box-shadow 0.2s;
          white-space: nowrap;
          letter-spacing: 0.01em;
        }
        .ml-quote-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 22px rgba(14,165,233,0.55);
        }
        /* small dot divider between the two buttons */
        .ml-btn-divider {
          width: 1px;
          height: 20px;
          background: rgba(255,255,255,0.18);
          flex-shrink: 0;
        }
        .ml-header.scrolled .ml-btn-divider { background: #e2e8f0; }

        /* HAMBURGER */
        .ml-menu-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 7px;
          border-radius: 8px;
          flex-direction: column;
          gap: 5px;
          transition: background 0.2s;
        }
        .ml-menu-toggle:hover { background: rgba(255,255,255,0.1); }
        .ml-header.scrolled .ml-menu-toggle:hover { background: #f1f5f9; }

        .ml-bar {
          display: block;
          width: 22px; height: 2px;
          border-radius: 2px;
          background: #fff;
          transition: all 0.3s;
        }
        .ml-header.scrolled .ml-bar { background: #0A1628; }
        .ml-bar.open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .ml-bar.open:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .ml-bar.open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* MOBILE MENU */
        .ml-mobile-menu {
          position: fixed;
          top: 70px;
          left: 0; right: 0;
          background: #fff;
          border-bottom: 1px solid #e2e8f0;
          box-shadow: 0 20px 50px rgba(0,0,0,0.12);
          padding: 16px 20px 24px;
          transform: translateY(-10px);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.25s ease, opacity 0.25s ease;
          z-index: 999;
        }
        .ml-mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
        }
        .ml-mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-bottom: 16px;
        }
        .ml-mobile-link {
          text-decoration: none;
          color: #0A1628;
          font-size: 0.95rem;
          font-weight: 600;
          padding: 12px 14px;
          border-radius: 10px;
          transition: background 0.15s;
        }
        .ml-mobile-link:hover { background: #f1f5f9; }
        .ml-mobile-actions {
          display: flex;
          gap: 10px;
          padding-top: 14px;
          border-top: 1px solid #f1f5f9;
        }
        .ml-mobile-contact {
          flex: 1;
          text-align: center;
          padding: 12px;
          border-radius: 10px;
          background: #fff;
          box-shadow: 0 0 0 1.5px #0ea5e9, 0 2px 8px rgba(14,165,233,0.12);
          color: #0284c7;
          font-size: 0.875rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s;
        }
        .ml-mobile-contact:hover {
          background: #eff9ff;
          box-shadow: 0 0 0 1.5px #0284c7, 0 4px 14px rgba(14,165,233,0.22);
        }
        .ml-mobile-quote {
          flex: 1;
          text-align: center;
          padding: 12px;
          border-radius: 10px;
          background: linear-gradient(135deg, #0ea5e9, #0284c7);
          color: #fff;
          font-size: 0.875rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(14,165,233,0.3);
        }

        @media (max-width: 768px) {
          .ml-nav { display: none; }
          .ml-contact-btn { display: none; }
          .ml-btn-divider { display: none; }
          .ml-menu-toggle { display: flex; }
        }
        @media (max-width: 440px) {
          .ml-quote-btn { display: none; }
        }
      `}</style>

      <header className={`ml-header${scrolled ? " scrolled" : ""}`}>
        <div className="ml-header-inner">

          <Link href="/" className="ml-logo">
            <div className="ml-logo-icon"><Sparkles/></div>
            <div>
              <div className="ml-logo-name">M&amp;L Cleaning Group</div>
              <div className="ml-logo-tagline">South Yorkshire</div>
            </div>
          </Link>

          <nav className="ml-nav">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="ml-nav-link">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="ml-header-actions">
            <Link href="/contact" className="ml-contact-btn">
              Contact Us
            </Link>
            <div className="ml-btn-divider" />
            <Link href="/free-quote" className="ml-quote-btn">
              ✦ Free Quote
            </Link>
            <button
              className="ml-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`ml-bar${menuOpen ? " open" : ""}`} />
              <span className={`ml-bar${menuOpen ? " open" : ""}`} />
              <span className={`ml-bar${menuOpen ? " open" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      <div className={`ml-mobile-menu${menuOpen ? " open" : ""}`}>
        <nav className="ml-mobile-nav">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="ml-mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-mobile-actions">
          <Link href="/contact" className="ml-mobile-contact" onClick={() => setMenuOpen(false)}>
            Contact Us
          </Link>
          <Link href="/free-quote" className="ml-mobile-quote" onClick={() => setMenuOpen(false)}>
            ✦ Free Quote
          </Link>
        </div>
      </div>
    </>
  );
}