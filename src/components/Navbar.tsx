"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/blog", label: "博客" },
  { href: "/gallery", label: "相册" },
  { href: "/about", label: "关于" },
];

export default function Navbar({ authButton }: { authButton?: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(255,255,255,0.85)] backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.08)]"
            : "bg-[rgba(255,255,255,0.72)] backdrop-blur-xl"
        }`}
        style={{ height: "44px" }}
      >
        <div className="max-w-[980px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-[17px] font-semibold text-[#1d1d1f] tracking-[-0.003em] hover:text-[#0071e3] transition-colors duration-200"
          >
            晴间有云
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[14px] font-medium transition-colors duration-200 relative group pb-0.5 ${
                  pathname === link.href
                    ? "text-[#0071e3]"
                    : "text-[#1d1d1f] hover:text-[#0071e3]"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-[#0071e3] rounded-full transition-all duration-200 ${
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
            <div className="text-[14px] font-medium text-[#1d1d1f]">{authButton}</div>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] text-[#1d1d1f]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="切换菜单"
          >
            <span
              className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 origin-center ${
                menuOpen ? "w-5 translate-y-[6.5px] rotate-45" : "w-5"
              }`}
            />
            <span
              className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 ${
                menuOpen ? "w-0 opacity-0" : "w-4"
              }`}
            />
            <span
              className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 origin-center ${
                menuOpen ? "w-5 -translate-y-[6.5px] -rotate-45" : "w-5"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out md:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-white/95 backdrop-blur-2xl" />
        <nav className="relative flex flex-col items-center justify-center h-full gap-8 px-6">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[32px] font-bold tracking-tight transition-all duration-300 ${
                pathname === link.href
                  ? "text-[#0071e3]"
                  : "text-[#1d1d1f] hover:text-[#0071e3]"
              } ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
          <div
            className={`text-[18px] font-medium text-[#6e6e73] transition-all duration-300 ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: menuOpen ? "240ms" : "0ms" }}
          >
            {authButton}
          </div>
        </nav>
      </div>
    </>
  );
}
