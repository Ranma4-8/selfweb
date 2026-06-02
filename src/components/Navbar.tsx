"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/blog", label: "博客" },
  { href: "/gallery", label: "相册" },
  { href: "/about", label: "关于" },
];

export default function Navbar({ authButton }: { authButton?: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/10">
      <div className="max-w-[980px] mx-auto px-6 h-12 flex items-center justify-between">
        <Link href="/" className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight hover:text-[#0071e3] transition-colors">
          晴间有云
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[14px] transition-colors relative group ${
                pathname === link.href
                  ? "text-[#0071e3]"
                  : "text-[#1d1d1f] hover:text-[#0071e3]"
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-0.5 left-0 h-px bg-[#0071e3] transition-all duration-200 ${
                pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>
          ))}
          {authButton}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-[#1d1d1f] hover:text-[#0071e3] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-black/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[14px] transition-colors ${
                pathname === link.href ? "text-[#0071e3]" : "text-[#1d1d1f] hover:text-[#0071e3]"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {authButton}
        </div>
      )}
    </header>
  );
}
