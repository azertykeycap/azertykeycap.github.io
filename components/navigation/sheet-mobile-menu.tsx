"use client";

import {
  NavigationLinksInterface,
  ShapedNavigationLinksInterface,
} from "@/lib/api/contentful";
import { Menu } from "lucide-react";
import * as React from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { ActiveLink } from "./active-link";
import { cn } from "@/lib/utils";

export default function SheetMobileMenu({
  links,
}: {
  links: ShapedNavigationLinksInterface;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="flex xl:hidden"
          size="icon"
          aria-label="Open menu"
        >
          <Menu className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-left">
            <ActiveLink
              href={"/"}
              className="font-bold tracking-tight text-lg mr-4"
              onClick={() => setOpen(false)}
            >
              Azertykeycaps
            </ActiveLink>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col mt-8 gap-y-4">
          {Object.entries(links).map(([link, subLinks]) => (
            <React.Fragment key={link}>
              {(subLinks as NavigationLinksInterface[]).map((subLink) => (
                <ActiveLink
                  key={subLink.title}
                  href={`/profil/${subLink.slug}`}
                  onClick={() => setOpen(false)}
                  className="inline-block transition-colors hover:text-foreground/80 text-foreground/60 text-base font-medium"
                >
                  {subLink.title}
                </ActiveLink>
              ))}
            </React.Fragment>
          ))}
          <ActiveLink
            href="/informations"
            className={cn(
              "inline-block transition-colors hover:text-foreground/80 text-foreground/60 text-base font-medium"
            )}
            onClick={() => setOpen(false)}
          >
            Informations
          </ActiveLink>
          <ActiveLink
            href="/dropshipping"
            className={
              "inline-block transition-colors hover:text-foreground/80 text-foreground/60 text-base font-medium"
            }
            onClick={() => setOpen(false)}
          >
            Dropshipping
          </ActiveLink>
        </div>
      </SheetContent>
    </Sheet>
  );
}
