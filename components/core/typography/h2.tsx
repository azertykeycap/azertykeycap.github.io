import * as React from "react";

export interface TypographyH1Props {
  children: React.ReactNode;
  itemProp?: string;
}

export function TypographyH1({ children, itemProp }: TypographyH1Props) {
  return (
    <h2
      itemProp={itemProp}
      className="scroll-m-20 text-2xl font-semibold tracking-tight"
    >
      {children}
    </h2>
  );
}
