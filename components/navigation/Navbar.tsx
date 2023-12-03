import * as React from "react";
import { ModeToggle } from "../theme/mode-toggle";
import { NavigationMenuNavbar } from "./Menu";
import { ShapedNavigationLinksInterface } from "@/lib/api/contentful";
import { cn } from "@/lib/utils";
import { ActiveLink } from "./ActiveLink";
import { CommandDialogDemo } from "../core/CommandDialog";

export function Navbar({ links }: { links: ShapedNavigationLinksInterface }) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center gap-4 justify-between">
        <div className="flex gap-x-4 items-center">
          <ActiveLink
            href={"/"}
            className="font-bold tracking-tight text-base mr-4"
          >
            Azertykeycaps
          </ActiveLink>
          <NavigationMenuNavbar links={links} />
        </div>
        <div className="flex gap-x-4 items-center">
          <ActiveLink
            href="/informations"
            className={cn(
              "transition-colors hover:text-foreground/80 text-foreground/60 text-sm font-medium"
            )}
          >
            Informations
          </ActiveLink>
          <ActiveLink
            href="/dropshipping"
            className={
              "transition-colors hover:text-foreground/80 text-foreground/60 text-sm font-medium"
            }
          >
            Dropshipping
          </ActiveLink>
          <CommandDialogDemo />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
