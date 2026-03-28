'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { label: 'Home',          href: '/' },
  { label: "Let's Play",    href: '/lets-play' },
  { label: 'Fun Moments',   href: '/fun-moments' },
  { label: 'Deals & Drops', href: '/deals-drops' },
  { label: 'Celebrate Big', href: '/celebrate-big' },
  { label: 'Our Story',     href: '/our-story' },
];

const glowColors = ['#FF3B3B', '#FFD700', '#3B8BFF', '#FF3B3B', '#FFD700', '#3B8BFF'];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const [hovered,    setHovered]    = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        /* ── red-yellow-blue gradient border ── */
        .funenza-nav {
          position: relative;
        }
        .funenza-nav::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 2px;
          background: linear-gradient(
            90deg,
            #FF3B3B  0%,
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

        /* ── logo glow breathe ── */
        @keyframes logoBreathe {
          0%,100% { filter: drop-shadow(0 0 8px rgba(255,215,0,0.55)); }
          50%     { filter: drop-shadow(0 0 24px rgba(255,215,0,1)); }
        }
        .logo-glow { animation: logoBreathe 3s ease-in-out infinite; }

        /* ── link underline sweep ── */
        .nav-link-item { position: relative; }
        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: -3px; left: 0;
          width: 0; height: 2px;
          border-radius: 2px;
          background: currentColor;
          transition: width 0.28s ease;
        }
        .nav-link-item:hover::after { width: 100%; }

        /* ── mobile animations ── */
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes fadeInUp {
          from { transform: translateY(14px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .mobile-menu-enter { animation: slideInRight 0.4s cubic-bezier(0.16,1,0.3,1) forwards; }
        .mobile-link-anim  { animation: fadeInUp 0.35s ease forwards; opacity: 0; }

        /* ── hamburger ── */
        @keyframes hamTop  { to { transform: translateY(7px)  rotate(45deg);  } }
        @keyframes hamMid  { to { opacity:0; transform:scaleX(0); } }
        @keyframes hamBot  { to { transform: translateY(-7px) rotate(-45deg); } }
        @keyframes hamTopR { to { transform: translateY(0) rotate(0); } }
        @keyframes hamMidR { to { opacity:1; transform:scaleX(1); } }
        @keyframes hamBotR { to { transform: translateY(0) rotate(0); } }
        .ham-top-x { animation: hamTop  0.32s ease forwards; }
        .ham-mid-x { animation: hamMid  0.32s ease forwards; }
        .ham-bot-x { animation: hamBot  0.32s ease forwards; }
        .ham-top   { animation: hamTopR 0.32s ease forwards; }
        .ham-mid   { animation: hamMidR 0.32s ease forwards; }
        .ham-bot   { animation: hamBotR 0.32s ease forwards; }

        /* ── dot pulse ── */
        @keyframes dotPulse {
          0%,100% { opacity:0.35; transform:scale(0.8); }
          50%     { opacity:1;    transform:scale(1.2); }
        }
      `}</style>

      {/* ══════ NAVBAR ══════ */}
      <nav
        className="funenza-nav fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(6, 6, 18, 0.94)'
            : 'rgba(6, 6, 18, 0.68)',
          backdropFilter:       'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.6)' : 'none',
          overflow: 'visible',   /* ← lets logo hang below */
        }}
      >
        <div
          className="max-w-7xl mx-auto flex items-center justify-between relative"
          style={{
            height:     scrolled ? '56px' : '64px',
            padding:    '0 24px',
            overflow:   'visible',
            transition: 'height 0.4s ease',
            zIndex:     2,
          }}
        >

          {/* ── LOGO — top half inside bar, bottom half hangs out ── */}
          <Link
            href="/"
            onClick={() => setActiveLink('/')}
            style={{ position: 'relative', zIndex: 60, flexShrink: 0 }}
          >
            <div
              className="logo-glow transition-transform duration-300 hover:scale-105"
              style={{
                width:    '130px',
                height:   '130px',
                position: 'relative',
                top:      '32px',   /* shifts logo DOWN so it overlaps below bar */
                left:     '-8px',
              }}
            >
              <Image
                src="/logo.png"
                alt="Funenza"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* ── DESKTOP LINKS ── */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((link, i) => {
              const color     = glowColors[i];
              const isActive  = activeLink === link.href;
              const isHovered = hovered    === link.label;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="nav-link-item px-3.5 py-2 rounded-md text-sm font-semibold tracking-wide select-none"
                  style={{
                    color:      isActive || isHovered ? color : 'rgba(255,255,255,0.85)',
                    textShadow: isHovered ? `0 0 10px ${color}, 0 0 22px ${color}66` : 'none',
                    background: isHovered ? `${color}14` : 'transparent',
                    transition: 'all 0.22s ease',
                  }}
                  onMouseEnter={() => setHovered(link.label)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setActiveLink(link.href)}
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
              );
            })}
          </div>

          {/* ── HAMBURGER (mobile only) ── */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg gap-[6px] focus:outline-none flex-shrink-0"
            style={{
              background:  menuOpen ? 'rgba(255,215,0,0.12)' : 'rgba(255,255,255,0.06)',
              border:      `1px solid ${menuOpen ? 'rgba(255,215,0,0.45)' : 'rgba(255,255,255,0.14)'}`,
              transition:  'all 0.3s ease',
            }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <span
                key={i}
                className={`block h-[2px] rounded-full origin-center ${
                  menuOpen
                    ? ['ham-top-x','ham-mid-x','ham-bot-x'][i]
                    : ['ham-top',  'ham-mid',  'ham-bot'  ][i]
                }`}
                style={{
                  width:           i === 1 ? '16px' : '22px',
                  backgroundColor: menuOpen ? '#FFD700' : 'rgba(255,255,255,0.85)',
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* ══════ MOBILE OVERLAY ══════ */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ══════ MOBILE DRAWER ══════ */}
      {menuOpen && (
        <div
          className="mobile-menu-enter fixed top-0 right-0 bottom-0 z-50 w-72 lg:hidden flex flex-col pt-20 pb-8 px-6"
          style={{
            background:           'rgba(6, 6, 20, 0.97)',
            backdropFilter:       'blur(24px)',
            borderLeft:           '1px solid rgba(255,215,0,0.2)',
            boxShadow:            '-8px 0 40px rgba(0,0,0,0.65)',
          }}
        >
          {/* colour dots */}
          <div className="flex items-center gap-2 mb-7 px-1">
            {['#FF3B3B','#FFD700','#3B8BFF','#FF3B3B','#FFD700'].map((c, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{
                  backgroundColor: c,
                  animation: `dotPulse 1.4s ease-in-out ${i * 0.15}s infinite`,
                }}
              />
            ))}
          </div>

          {/* links */}
          <div className="flex flex-col gap-2">
            {navLinks.map((link, i) => {
              const color = glowColors[i];
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="mobile-link-anim flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-semibold"
                  style={{
                    animationDelay: `${i * 0.06}s`,
                    color:          'rgba(255,255,255,0.88)',
                    border:         '1px solid rgba(255,255,255,0.07)',
                    background:     'rgba(255,255,255,0.03)',
                    transition:     'all 0.2s ease',
                  }}
                  onClick={() => { setActiveLink(link.href); setMenuOpen(false); }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color       = color;
                    e.currentTarget.style.background  = `${color}16`;
                    e.currentTarget.style.borderColor = `${color}45`;
                    e.currentTarget.style.textShadow  = `0 0 10px ${color}99`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color       = 'rgba(255,255,255,0.88)';
                    e.currentTarget.style.background  = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.textShadow  = 'none';
                  }}
                >
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* bottom dots */}
          <div className="mt-auto flex justify-center gap-3">
            {['#FF3B3B','#FFD700','#3B8BFF'].map((c, i) => (
              <span
                key={i}
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: c,
                  boxShadow: `0 0 8px ${c}99`,
                  animation: `dotPulse 1.4s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
