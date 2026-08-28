"use client";

import React from "react";

interface NavigationLinksProps {
  onItemClick?: () => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const navItems = [
  { index: "01", label: "ABOUT", href: "#about" },
  { index: "02", label: "WHAT WE BUILD", href: "#work" },
  { index: "03", label: "PRINCIPLES", href: "#principles" },
  { index: "04", label: "CONTACT", href: "#contact" },
];

export function NavigationLinks({
  onItemClick,
  orientation = "horizontal",
  className = "",
}: NavigationLinksProps) {
  return (
    <ul
      className={`flex ${
        orientation === "vertical"
          ? "flex-col space-y-5"
          : "flex-row items-center space-x-6 sm:space-x-8 md:space-x-10"
      } ${className}`}
    >
      {navItems.map((item) => (
        <li key={item.index}>
          <a
            href={item.href}
            onClick={onItemClick}
            className="group inline-flex items-center gap-2 font-mono text-xs sm:text-xs tracking-wider text-muted hover:text-foreground transition-colors py-1"
          >
            <span className="text-accent/80 group-hover:text-accent transition-colors font-mono">
              {item.index}
            </span>
            <span className="font-medium tracking-widest">{item.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
