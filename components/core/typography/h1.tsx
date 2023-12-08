import * as React from "react";

export interface TypographyH1Props {
  children: React.ReactNode;
  itemProp?: string;
}

export function TypographyH1({ children, itemProp }: TypographyH1Props) {
  return (
    <h1
      itemProp={itemProp}
      className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
    >
      {children}
    </h1>
  );
}
