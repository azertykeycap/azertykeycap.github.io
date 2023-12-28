"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

export const ActiveLink = ({
  className,
  href,
  children,
  onClick,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "hidden xl:inline-block transition-colors hover:text-foreground text-foreground/60 text-sm font-medium",
        className,
        pathname === href ? "text-foreground" : ""
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </Link>
  );
};
