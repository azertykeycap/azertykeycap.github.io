"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

export const ActiveLink = ({
  className,
  href,
  children,
  ...props
}: {
  className: string;
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(className, pathname === href ? "text-foreground/80" : "")}
      {...props}
    >
      {children}
    </Link>
  );
};
