'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* =========================
   NAVBAR LINKS
   Edit labels and routes here
========================= */
const navLinks = [
  { label: 'Home', href: '/' },
  { label: "Let's Play", href: '/lets-play' },
  { label: 'Fun Moments', href: '/fun-moments' },
  { label: 'Deals & Drops', href: '/deals-drops' },
  { label: 'Celebrate Big', href: '/celebrate-big' },
  { label: 'Our Story', href: '/our-story' },
];

/* =========================
   LINK GLOW COLORS
   Used for desktop hover and mobile accents
========================= */
const glowColors = ['#FF3B3B', '#FFD700', '#3B8BFF', '#FF3B3B', '#FFD700', '#3B8BFF'];

export default function Navbar() {
  /* =========================
     STATES
  ========================= */
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const [hovered, setHovered] = useState(null);

  /* =========================
     SCROLL DETECTION
     Makes navbar slightly stronger on scroll
  ========================= */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* =========================
     LOCK BODY SCROLL
     Prevent page scrolling when mobile menu is open
  ========================= */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      {/* =========================
         CUSTOM CSS
         Animations and visual effects
      ========================= */}
      <style>{`
        /* Gradient border ring */
        .funenza-nav {
          position: relative;
        }

        .funenza-nav::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1.5px;
          border-radius: 22px;
          background: linear-gradient(
            90deg,
            #FF3B3B 0%,
            #FF8C00 20%,
            #FFD700 38%,
            #3B8BFF 58%,
            #FF3B3B 75%,
            #FFD700 88%,
            #3B8BFF 100%
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          z-index: 1;
        }

        /* Logo glow animation */
        @keyframes logoBreathe {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.55)); }
          50% { filter: drop-shadow(0 0 24px rgba(255, 215, 0, 1)); }
        }

        .logo-glow {
          animation: logoBreathe 3s ease-in-out infinite;
        }

        /* Desktop link underline */
        .nav-link-item {
          position: relative;
          display: inline-block;
        }

        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          border-radius: 999px;
          background: currentColor;
          transition: width 0.28s ease;
        }

        .nav-link-item:hover::after {
          width: 100%;
        }

        /* Mobile drawer animation */
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes fadeInUp {
          from { transform: translateY(14px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .mobile-menu-enter {
          animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .mobile-link-anim {
          animation: fadeInUp 0.35s ease forwards;
          opacity: 0;
        }

        /* Hamburger animation */
        @keyframes hamTop { to { transform: translateY(7px) rotate(45deg); } }
        @keyframes hamMid { to { opacity: 0; transform: scaleX(0); } }
        @keyframes hamBot { to { transform: translateY(-7px) rotate(-45deg); } }
        @keyframes hamTopR { to { transform: translateY(0) rotate(0); } }
        @keyframes hamMidR { to { opacity: 1; transform: scaleX(1); } }
        @keyframes hamBotR { to { transform: translateY(0) rotate(0); } }

        .ham-top-x { animation: hamTop 0.32s ease forwards; }
        .ham-mid-x { animation: hamMid 0.32s ease forwards; }
        .ham-bot-x { animation: hamBot 0.32s ease forwards; }
        .ham-top { animation: hamTopR 0.32s ease forwards; }
        .ham-mid { animation: hamMidR 0.32s ease forwards; }
        .ham-bot { animation: hamBotR 0.32s ease forwards; }

        /* Dot pulse */
        @keyframes dotPulse {
          0%, 100% { opacity: 0.35; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>

      {/* =========================
         MOBILE BACKDROP
      ========================= */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* =========================
         MAIN HEADER WRAPPER
      ========================= */}
      <header className="absolute top-8 left-1/2 z-50 w-[99%] max-w-[1280px] -translate-x-1/2">
        {/* =========================
           BAR BACKGROUND
        ========================= */}
        <div
          className="funenza-nav relative h-[42px] w-full rounded-[22px]"
          style={{
            background: scrolled ? 'rgba(6, 6, 18, 0.94)' : 'rgba(6, 6, 18, 0.68)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.6)' : 'none',
            border: '1px solid rgba(255,255,255,0.10)',
            overflow: 'visible',
            transition: 'all 0.4s ease',
          }}
        >
          {/* =========================
             LOGO SECTION
          ========================= */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 md:left-12">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setActiveLink('/')}
              style={{ position: 'relative', zIndex: 60, flexShrink: 0 }}
            >
              <div className="logo-glow transition-transform duration-300 hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Funenza"
                  width={140}
                  height={60}
                  priority
                  className="h-auto w-[120px] md:w-[140px]"
                />
              </div>
            </Link>
          </div>

          {/* =========================
             DESKTOP NAV LINKS
          ========================= */}
          <nav className="absolute right-4 top-1/2 hidden -translate-y-1/2 lg:block md:right-6">
            <ul className="flex w-max items-center gap-5 xl:gap-6">
              {navLinks.map((link, i) => {
                const color = glowColors[i];
                const isActive = activeLink === link.href;
                const isHovered = hovered === link.label;

                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setActiveLink(link.href)}
                      onMouseEnter={() => setHovered(link.label)}
                      onMouseLeave={() => setHovered(null)}
                      className="nav-link-item relative rounded-md px-3 py-1 text-[12px] font-semibold whitespace-nowrap tracking-[0.01em] select-none transition"
                      style={{
                        color: isActive || isHovered ? color : 'rgba(255,255,255,0.85)',
                        textShadow: isHovered ? `0 0 10px ${color}, 0 0 22px ${color}66` : 'none',
                        background: isHovered ? `${color}14` : 'transparent',
                        transition: 'all 0.22s ease',
                      }}
                    >
                      <span
                        style={{
                          borderBottom: isActive ? `2px solid ${color}` : '2px solid transparent',
                          paddingBottom: '2px',
                          transition: 'border-color 0.25s ease',
                        }}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* =========================
             MOBILE MENU BUTTON
          ========================= */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 flex-col items-center justify-center gap-[6px] rounded-lg lg:hidden md:right-6"
            style={{
              background: menuOpen ? 'rgba(255,215,0,0.12)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${menuOpen ? 'rgba(255,215,0,0.45)' : 'rgba(255,255,255,0.14)'}`,
              transition: 'all 0.3s ease',
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block h-[2px] rounded-full origin-center ${
                  menuOpen
                    ? ['ham-top-x', 'ham-mid-x', 'ham-bot-x'][i]
                    : ['ham-top', 'ham-mid', 'ham-bot'][i]
                }`}
                style={{
                  width: i === 1 ? '16px' : '22px',
                  backgroundColor: menuOpen ? '#FFD700' : 'rgba(255,255,255,0.85)',
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* =========================
         MOBILE DRAWER
      ========================= */}
      {menuOpen && (
        <aside
          className="mobile-menu-enter fixed top-0 right-0 bottom-0 z-50 flex h-full w-[82%] max-w-[320px] flex-col px-6 pt-20 pb-8 text-white shadow-2xl lg:hidden"
          style={{
            background: 'rgba(6, 6, 20, 0.97)',
            backdropFilter: 'blur(24px)',
            borderLeft: '1px solid rgba(255,215,0,0.2)',
            boxShadow: '-8px 0 40px rgba(0,0,0,0.65)',
          }}
        >
          {/* Top row */}
          <div className="mb-7 flex items-center justify-between">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <Image
                src="/logo.png"
                alt="Funenza"
                width={120}
                height={50}
                className="h-auto w-[110px]"
              />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-xl"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.16)',
              }}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Top dots */}
          <div className="mb-7 flex items-center gap-2 px-1">
            {['#FF3B3B', '#FFD700', '#3B8BFF', '#FF3B3B', '#FFD700'].map((c, i) => (
              <span
                key={i}
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: c,
                  animation: `dotPulse 1.4s ease-in-out ${i * 0.15}s infinite`,
                }}
              />
            ))}
          </div>

          {/* Mobile links */}
          <nav>
            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => {
                const color = glowColors[i];

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="mobile-link-anim flex items-center gap-3 rounded-xl px-4 py-3.5 text-[15px] font-semibold"
                    style={{
                      animationDelay: `${i * 0.06}s`,
                      color: 'rgba(255,255,255,0.88)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      background: activeLink === link.href ? `${color}16` : 'rgba(255,255,255,0.03)',
                      transition: 'all 0.2s ease',
                    }}
                    onClick={() => {
                      setActiveLink(link.href);
                      setMenuOpen(false);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = color;
                      e.currentTarget.style.background = `${color}16`;
                      e.currentTarget.style.borderColor = `${color}45`;
                      e.currentTarget.style.textShadow = `0 0 10px ${color}99`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.88)';
                      e.currentTarget.style.background =
                        activeLink === link.href ? `${color}16` : 'rgba(255,255,255,0.03)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                      e.currentTarget.style.textShadow = 'none';
                    }}
                  >
                    <span
                      className="h-2 w-2 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Bottom dots */}
          <div className="mt-auto flex justify-center gap-3">
            {['#FF3B3B', '#FFD700', '#3B8BFF'].map((c, i) => (
              <span
                key={i}
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: c,
                  boxShadow: `0 0 8px ${c}99`,
                  animation: `dotPulse 1.4s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        </aside>
      )}
    </>
  );
}