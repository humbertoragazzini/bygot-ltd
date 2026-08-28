import React from "react";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  strong?: boolean;
}

export function Divider({
  orientation = "horizontal",
  className = "",
  strong = false,
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={`w-px self-stretch ${
          strong ? "bg-border-strong" : "bg-border"
        } ${className}`}
      />
    );
  }

  return (
    <hr
      className={`w-full border-0 h-px ${
        strong ? "bg-border-strong" : "bg-border"
      } ${className}`}
    />
  );
}
