import * as React from "react";

interface TypographyPProps {
  children: React.ReactNode;
  itemProp?: string;
}

export function TypographyP({ children, itemProp }: TypographyPProps) {
  return (
    <p itemProp={itemProp} className="leading-7 [&:not(:first-child)]:mt-6">
      {children}
    </p>
  );
}
