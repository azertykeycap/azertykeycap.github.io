import * as React from "react";
import { ModeToggle } from "../theme/mode-toggle";
import { NavigationMenuNavbar } from "./menu";
import { ShapedNavigationLinksInterface } from "@/lib/api/contentful";
import Link from "next/link";

export function Navbar({ links }: { links: ShapedNavigationLinksInterface }) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center gap-4 justify-between">
        <div className="flex gap-x-4 items-center">
          <span className="font-bold tracking-tight text-lg mr-4">
            Azertykeycaps
          </span>
          <NavigationMenuNavbar links={links} />
        </div>
        <div className="flex gap-x-4 items-center">
          <Link
            href="/informations"
            className={
              "transition-colors hover:text-foreground/80 text-foreground/60 text-sm font-medium"
            }
          >
            Informations
          </Link>
          <Link
            href="/dropshipping"
            className={
              "transition-colors hover:text-foreground/80 text-foreground/60 text-sm font-medium"
            }
          >
            Dropshipping
          </Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
