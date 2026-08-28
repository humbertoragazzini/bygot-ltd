import React from "react";

interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "subtle" | "mono";
  showArrow?: boolean;
}

export function TextLink({
  children,
  href,
  className = "",
  variant = "primary",
  showArrow = false,
  ...props
}: TextLinkProps) {
  const baseStyles =
    "inline-flex items-center gap-2 group transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-foreground";

  const variantStyles = {
    primary:
      "text-foreground font-medium text-base sm:text-lg border-b border-foreground/60 hover:border-foreground pb-0.5",
    secondary:
      "text-muted font-normal text-base sm:text-lg border-b border-muted/40 hover:text-foreground hover:border-foreground pb-0.5",
    subtle:
      "text-muted hover:text-foreground text-sm",
    mono:
      "font-mono text-xs uppercase tracking-wider text-muted hover:text-foreground",
  };

  return (
    <a
      href={href}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {showArrow && (
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-200 group-hover:translate-x-1 font-mono text-xs"
        >
          →
        </span>
      )}
    </a>
  );
}
