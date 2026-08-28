import React from "react";
import { Container } from "@/components/atoms/Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 sm:py-16 text-muted border-t border-border">
      <Container>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 font-mono text-xs tracking-wider">
          {/* Left: Copyright */}
          <div>
            <span>© {currentYear} BYGOT LTD</span>
          </div>

          {/* Center / Registration */}
          <div className="text-muted/80">
            <span>Registered in the United Kingdom</span>
          </div>

          {/* Right: Back to Top Link */}
          <div>
            <a
              href="#top"
              className="inline-flex items-center gap-1.5 text-foreground hover:text-accent transition-colors uppercase tracking-widest"
              aria-label="Back to top"
            >
              <span>TOP</span>
              <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
