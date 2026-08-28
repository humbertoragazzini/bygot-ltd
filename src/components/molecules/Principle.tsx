import React from "react";

interface PrincipleProps {
  number: string;
  title: string;
  description: string;
  className?: string;
}

export function Principle({
  number,
  title,
  description,
  className = "",
}: PrincipleProps) {
  return (
    <div className={`flex flex-col justify-between ${className}`}>
      <div>
        <div className="font-mono text-xs text-accent tracking-widest uppercase mb-4 sm:mb-6">
          {number}
        </div>
        <h3 className="text-foreground text-xl sm:text-2xl font-medium tracking-tight mb-3 sm:mb-4">
          {title}
        </h3>
      </div>
      <p className="text-muted text-base leading-relaxed font-normal">
        {description}
      </p>
    </div>
  );
}
