import { cn } from "@/lib/utils";
import * as React from "react";

export interface TypographyH1Props {
  children: React.ReactNode;
  className?: string;
  itemProp?: string;
}

export function TypographyH2({
  children,
  className,
  itemProp,
}: TypographyH1Props) {
  return (
    <h2
      itemProp={itemProp}
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h2>
  );
}
