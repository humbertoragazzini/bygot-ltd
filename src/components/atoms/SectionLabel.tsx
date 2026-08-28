import React from "react";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <div
      className={`font-mono text-xs tracking-widest text-accent uppercase ${className}`}
    >
      {children}
    </div>
  );
}
