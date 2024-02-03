import { cn } from "@/lib/utils";
import * as React from "react";

interface TypographyPProps {
  children: React.ReactNode;
  className?: string;
  itemProp?: string;
}

export function TypographyP({
  children,
  itemProp,
  className,
}: TypographyPProps) {
  return (
    <p
      itemProp={itemProp}
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
    >
      {children}
    </p>
  );
}
