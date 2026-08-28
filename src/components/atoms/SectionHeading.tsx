import React from "react";

interface SectionHeadingProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
}

export function SectionHeading({
  children,
  as: Component = "h2",
  id,
  className = "",
}: SectionHeadingProps) {
  return (
    <Component
      id={id}
      className={`text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] ${className}`}
    >
      {children}
    </Component>
  );
}
