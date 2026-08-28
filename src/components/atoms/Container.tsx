import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer" | "main";
}

export function Container({
  children,
  className = "",
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={`mx-auto w-full max-w-[1440px] px-6 sm:px-8 md:px-12 lg:px-16 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
