"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type NavLink = { label: string; href: string; external?: boolean };

type NavbarProps = {
  siteName: string;
  tagline?: string | null;
  siteLogo?: string | null;
  navLinks: ReadonlyArray<NavLink>;
};

export default function Navbar({ siteName, tagline, siteLogo, navLinks }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Site logo + name */}
        <Link
          href="/"
          className="flex items-center gap-2.5 hover:opacity-75 transition-opacity"
        >
          {siteLogo && (
            <div className="relative h-8 w-8 flex-shrink-0">
              <Image
                src={siteLogo}
                alt={siteName}
                fill
                className="object-contain"
              />
            </div>
          )}
          <span className="text-xl font-bold tracking-tight">{siteName}</span>
          {tagline && (
            <span className="hidden sm:block text-xs text-neutral-500">{tagline}</span>
          )}
        </Link>

        {/* Desktop nav */}
        {navLinks.length > 0 && (
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        )}

        {/* Mobile hamburger */}
        {navLinks.length > 0 && (
          <button
            className="md:hidden p-2 text-neutral-600"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-0.5 bg-current mb-1.5" />
            <span className="block w-5 h-0.5 bg-current mb-1.5" />
            <span className="block w-5 h-0.5 bg-current" />
          </button>
        )}
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
                className="hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="hover:text-primary transition-colors"
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
