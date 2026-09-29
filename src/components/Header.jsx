/**
 * ============================================================
 * RudraPrasad - Portfolio Header Component
 * ============================================================
 * Features:
 * 1. Stylish code-like name brand (RudraPrasad)
 * 2. Quick navigation links (professional portfolio sections)
 * 3. "Hire Me" CTA + "Open to Work" badge
 * 4. Responsive: hamburger menu when width < 1000px
 * 5. Dark / Light theme toggle
 * 6. Float-on-scroll: Full width at top, shrinks into a floating pill on scroll
 * 7. Active link highlight with animated underline
 * 8. Mobile Overflow Fixed: Optimized spacing
 * 9. Typing cursor animation on the logo name
 * 10. Scroll progress bar beneath the header
 * 11. Command-palette shortcut hint (keyboard shortcut badge)
 * 12. Animated status dot for "Open to Work"
 * 13. Smooth section-spy (auto-highlights active nav link)
 * 14. Ripple effect on CTA button click
 * 15. Mobile optimized: Only Logo, Hire Me, and Menu icon on top.
 * ============================================================
 */

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certificate", href: "#certificate" },
  { label: "CV", href: "#cv" },
  { label: "Contact", href: "#contact" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function LogoBrand() {
  return (
    <a
      href="#hero"
      aria-label="RudraPrasad – home"
      className="group flex items-center gap-0.5 select-none shrink-0"
    >
      <span className="text-blue-600 dark:text-blue-400 font-mono font-bold text-base sm:text-lg transition-transform group-hover:scale-110 duration-300">
        &lt;
      </span>
      <span className="font-mono font-extrabold text-base sm:text-xl tracking-tight dark:text-white text-gray-900 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
        Rudra<span className="text-blue-600 dark:text-blue-400">Prasad</span>
      </span>
      <span className="text-blue-600 dark:text-blue-400 font-mono font-bold text-base sm:text-lg transition-transform group-hover:scale-110 duration-300">
        /&gt;
      </span>
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block w-0.5 h-4 sm:h-5 bg-blue-600 dark:bg-blue-400 animate-[blink_1s_step-end_infinite] rounded-sm"
      />
    </a>
  );
}

function NavLink({ href, label, active, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`relative px-2 py-1 text-sm font-medium tracking-wide transition-colors duration-200 whitespace-nowrap group ${
        active
          ? "text-blue-600 dark:text-blue-400"
          : "dark:text-gray-300 text-gray-600 hover:text-blue-600 dark:hover:text-blue-400"
      }`}
    >
      {label}
      <span
        className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-300 ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </a>
  );
}

function DarkModeToggle({ dark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full dark:text-yellow-300 text-gray-600 hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {dark ? (
        <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor">
          <path d="M12 3a1 1 0 011 1v1a1 1 0 01-2 0V4a1 1 0 011-1zm6.364 2.636a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM21 11a1 1 0 010 2h-1a1 1 0 010-2h1zM17.657 17.657a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM12 19a1 1 0 011 1v1a1 1 0 01-2 0v-1a1 1 0 011-1zM6.343 17.657a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM5 12a1 1 0 010-2H4a1 1 0 000 2h1zm1.757-6.364a1 1 0 011.414 0l.707.707A1 1 0 018.464 7.757l-.707-.707a1 1 0 010-1.414zM12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor">
          <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
        </svg>
      )}
    </button>
  );
}

function HireMeButton() {
  const btnRef = useRef(null);

  function handleRipple(e) {
    const btn = btnRef.current;
    if (!btn) return;
    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    const rect = btn.getBoundingClientRect();
    circle.style.cssText = `
      position:absolute; width:${diameter}px; height:${diameter}px;
      left:${e.clientX - rect.left - radius}px; top:${e.clientY - rect.top - radius}px;
      background:rgba(255,255,255,0.35); border-radius:50%;
      transform:scale(0); animation:ripple 0.55s linear; pointer-events:none;
    `;
    btn.appendChild(circle);
    circle.addEventListener("animationend", () => circle.remove());
  }

  return (
    <a
      ref={btnRef}
      onClick={handleRipple}
      href="#contact"
      className="hire-me-button relative overflow-hidden px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-sm font-semibold text-white bg-blue-600 dark:bg-blue-500 shadow-[0_0_12px_2px_rgba(37,99,235,0.5)] hover:shadow-[0_0_20px_4px_rgba(37,99,235,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/60 whitespace-nowrap shrink-0"
      aria-label="Hire me – open contact form"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] hover:translate-x-[200%] transition-transform duration-700"
      />
      <span className="hire-label">Hire Me</span><span className="hire-spark">✦</span>
      <span className="hire-pulse" aria-hidden="true" />
    </a>
  );
}

function OpenToWorkBadge() {
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold dark:bg-emerald-500/15 bg-emerald-50 dark:text-emerald-300 text-emerald-700 border dark:border-emerald-500/30 border-emerald-300 whitespace-nowrap"
      aria-label="Status: Open to work"
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      Open to Work
    </div>
  );
}

function HamburgerButton({ open, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="w-8 h-8 sm:w-9 sm:h-9 flex flex-col justify-center items-center gap-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shrink-0"
    >
      <span className={`block h-0.5 w-5 dark:bg-white bg-gray-800 rounded-full transition-all duration-300 ${open ? "translate-y-[8px] rotate-45" : ""}`} />
      <span className={`block h-0.5 w-5 dark:bg-white bg-gray-800 rounded-full transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
      <span className={`block h-0.5 w-5 dark:bg-white bg-gray-800 rounded-full transition-all duration-300 ${open ? "-translate-y-[8px] -rotate-45" : ""}`} />
    </button>
  );
}

// ─── Main Header Component ────────────────────────────────────────────────────

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const headerRef = useRef(null);

  useEffect(() => {
    const storedDark = localStorage.getItem("rp-dark");
    if (storedDark !== null) setDark(storedDark === "true");

    if (!document.getElementById("rp-keyframes")) {
      const style = document.createElement("style");
      style.id = "rp-keyframes";
      style.textContent = `
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        @keyframes ripple { to { transform:scale(4); opacity:0; } }
      `;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("rp-dark", String(dark));
  }, [dark]);

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;

      // Triggers the "float" animation
      setScrolled(scrollY > 30);
      setScrollProgress(docH > 0 ? Math.min((scrollY / docH) * 100, 100) : 0);

      const anchors = ["#hero", "#about", "#skills", "#projects", "#experience", "#certificate", "#cv", "#contact"];
      let current = "#hero";
      for (const id of anchors) {
        const el = document.querySelector(id);
        if (el && el.getBoundingClientRect().top <= 80) current = id;
      }
      setActiveSection(current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleOutside(e) {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const toggleDark = useCallback(() => setDark((d) => !d), []);
  const toggleMenu = useCallback(() => setMenuOpen((o) => !o), []);

  function handleNavClick(e, href) {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
    else window.location.hash = href;
    setActiveSection(href);
  }

  return (
    <>
      {/* Scroll Progress Bar (Fixed at absolute top) */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 h-0.5 z-[1000] bg-blue-600 dark:bg-blue-400 transition-all duration-100 ease-out shadow-[0_0_8px_2px_rgba(37,99,235,0.5)]"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Header Outer Wrapper */}
      <header
        ref={headerRef}
        role="banner"
        className={`fixed left-0 right-0 z-[999] transition-all duration-500 ease-in-out ${
          scrolled ? "top-2 sm:top-4 px-2 sm:px-6 lg:px-8" : "top-0 px-0"
        }`}
      >
        {/* Inner Container */}
        <div
          className={`
            mx-auto transition-all duration-500 ease-in-out
            ${scrolled
              ? "max-w-6xl rounded-2xl dark:bg-gray-950/75 bg-white/75 backdrop-blur-xl backdrop-saturate-150 border dark:border-white/10 border-gray-200/60 shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
              : "max-w-full rounded-none bg-transparent border-transparent shadow-none"
            }
          `}
        >
          {/* Main Bar Content */}
          <div className="flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 py-2.5 sm:py-3">
            
            <LogoBrand />

            {/* Desktop Navigation (Hidden < 1000px) */}
            <nav aria-label="Primary navigation" className="hidden min-[1000px]:flex items-center gap-2">
              {NAV_LINKS.map((link) => (
                <NavLink 
                  key={link.href} 
                  href={link.href} 
                  label={link.label} 
                  active={activeSection === link.href} 
                  onClick={(e) => handleNavClick(e, link.href)} 
                />
              ))}
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              
              {/* Desktop Only Badges (Hidden < 1000px) */}
              <div className="hidden min-[1000px]:flex items-center gap-3">
                <DarkModeToggle dark={dark} onToggle={toggleDark} />
                <OpenToWorkBadge />
                <a
                  href="https://drive.google.com/file/d/1feWlmmwJs86ty1Wqy2T21sFix766fiyy/view?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  className="header-cv-link"
                >
                  View CV ↗
                </a>
              </div>

              {/* Hire Me CTA (Visible on both desktop & mobile) */}
              <HireMeButton />

              {/* Hamburger Button (Hidden on Desktop >= 1000px) */}
              <div className="min-[1000px]:hidden">
                <HamburgerButton open={menuOpen} onToggle={toggleMenu} />
              </div>

            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          <div
            className={`min-[1000px]:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
            }`}
            aria-hidden={!menuOpen}
          >
            <div className={`px-4 pb-4 pt-2 flex flex-col gap-1 ${!scrolled ? "dark:bg-gray-900/95 bg-white/95 backdrop-blur-md rounded-b-2xl border-t dark:border-white/10 border-gray-200 shadow-xl" : ""}`}>
              
              {/* All Navigation Links inside Mobile Menu */}
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeSection === link.href
                      ? "bg-blue-600/15 text-blue-600 dark:text-blue-400 font-semibold"
                      : "dark:text-gray-300 text-gray-700 hover:bg-black/5 dark:hover:bg-white/10 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${activeSection === link.href ? "bg-blue-600 dark:bg-blue-400" : "dark:bg-gray-600 bg-gray-400"}`} />
                  {link.label}
                </a>
              ))}

              {/* Open to Work Badge (Moved to dropdown for mobile) */}
              <div className="pt-2 pb-1 px-1">
                <OpenToWorkBadge />
              </div>

              <a
                href="https://drive.google.com/file/d/1feWlmmwJs86ty1Wqy2T21sFix766fiyy/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-blue-600 dark:text-blue-300 border border-blue-300/60 dark:border-blue-400/30 hover:bg-blue-500/10 transition-colors"
              >
                View my CV <span>↗</span>
              </a>

              {/* Dark Mode Toggle (Moved to dropdown for mobile) */}
              <div className="flex items-center justify-between px-2 py-3 mt-1 border-t dark:border-white/10 border-gray-200">
                <span className="text-sm font-medium dark:text-gray-400 text-gray-600">Theme Mode</span>
                <DarkModeToggle dark={dark} onToggle={toggleDark} />
              </div>

              {/* Quick Nav Hint */}
              <div className="hidden sm:flex items-center gap-1.5 pt-2 border-t dark:border-white/10 border-gray-100 px-2">
                <span className="text-[11px] dark:text-gray-500 text-gray-400">Quick nav:</span>
                <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono dark:bg-gray-800 bg-gray-100 dark:text-gray-300 text-gray-600 border dark:border-white/10 border-gray-200">Alt + K</kbd>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content hiding under fixed header */}
      <div className="h-20" aria-hidden="true" />
    </>
  );
}