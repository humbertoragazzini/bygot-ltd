"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Container } from "@/components/atoms/Container";
import { NavigationLinks } from "@/components/molecules/NavigationLinks";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-200 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xs border-b border-border shadow-xs"
          : "bg-white/70 backdrop-blur-xs border-b border-border/60"
      }`}
    >
      {/* Skip to main content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-foreground focus:text-white focus:px-4 focus:py-2 font-mono text-xs"
      >
        Skip to main content
      </a>

      <Container>
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Wordmark */}
          <a
            href="#top"
            className="group font-medium tracking-tight text-foreground text-lg sm:text-xl font-sans inline-flex items-center gap-2"
            aria-label="BYGOT LTD - Return to top"
          >
            <span>BYGOT LTD</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:block" aria-label="Main Navigation">
            <NavigationLinks orientation="horizontal" />
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 text-foreground focus:outline-hidden focus:ring-1 focus:ring-foreground"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
          >
            <span className="font-mono text-xs uppercase tracking-widest">
              {mobileMenuOpen ? "CLOSE" : "MENU"}
            </span>
          </button>
        </div>
      </Container>

      {/* 1px Scroll Progress Indicator */}
      <motion.div
        className="h-[1px] bg-accent origin-left w-full"
        style={{ scaleX }}
        aria-hidden="true"
      />

      {/* Mobile Navigation Dropdown / Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden fixed inset-x-0 top-[65px] sm:top-[81px] bottom-0 bg-white border-b border-border px-6 py-8 flex flex-col justify-between overflow-y-auto"
        >
          <div>
            <span className="font-mono text-[11px] text-muted uppercase tracking-widest block mb-6">
              Navigation
            </span>
            <NavigationLinks
              orientation="vertical"
              onItemClick={() => setMobileMenuOpen(false)}
            />
          </div>

          <div className="pt-8 border-t border-border mt-8">
            <span className="font-mono text-xs text-muted block mb-1">
              BYGOT LTD
            </span>
            <span className="font-mono text-[11px] text-muted/70 block">
              UNITED KINGDOM
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
