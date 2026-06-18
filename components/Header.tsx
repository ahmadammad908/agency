"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import "../app/home.css";

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
      <header className={`ml-header${scrolled ? " scrolled" : ""}`}>
        <div className="ml-header-inner">

          <Link href="/" className="ml-logo">
            <div className="ml-logo-icon">
              <Sparkles />
            </div>
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
          <Link
            href="/contact"
            className="ml-mobile-contact"
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </Link>
          <Link
            href="/free-quote"
            className="ml-mobile-quote"
            onClick={() => setMenuOpen(false)}
          >
            ✦ Free Quote
          </Link>
        </div>
      </div>
    </>
  );
}
