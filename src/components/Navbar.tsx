"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Oh Oh Coffee", href: "https://ohohcoffee.com", external: true },
  { label: "Wholesale", href: "https://ohohcoffee.com/wholesale", external: true },
  { label: "Higher Wage Wisconsin", href: "/#higher-wage" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="https://ohohcoffee.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl font-bold tracking-tight hover:opacity-75 transition-opacity"
        >
          Oh Oh Coffee
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-900 transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-neutral-900 transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-neutral-600"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 bg-current mb-1.5" />
          <span className="block w-5 h-0.5 bg-current mb-1.5" />
          <span className="block w-5 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-white border-t border-neutral-200 px-6 py-5 flex flex-col gap-5 text-sm font-medium text-neutral-600">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="hover:text-neutral-900 transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="hover:text-neutral-900 transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
      )}
    </header>
  );
}
