import { cn } from "@/lib/utils";
import * as React from "react";

export interface TypographyH1Props {
  children: React.ReactNode;
  className?: string;
  itemProp?: string;
}

export function TypographyH1({
  children,
  className,
  itemProp,
}: TypographyH1Props) {
  return (
    <h1
      itemProp={itemProp}
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
}
