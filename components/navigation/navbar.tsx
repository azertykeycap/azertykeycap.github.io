import * as React from "react";
import { ModeToggle } from "../theme/mode-toggle";
import { NavigationMenuNavbar } from "./menu";
import {
  NavigationLinksInterface,
  ShapedNavigationLinksInterface,
  getArticles,
} from "@/lib/api/contentful";
import { cn } from "@/lib/utils";
import { ActiveLink } from "./active-link";
import { CommandDialogDemo } from "../core/command-dialog";
import Link from "next/link";
import { Frown, Menu } from "lucide-react";
import { group } from "radash";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import SheetMobileMenu from "./sheet-mobile-menu";

export function Navbar({
  links,
  articles,
}: {
  links: ShapedNavigationLinksInterface;
  articles: Awaited<ReturnType<typeof getArticles>>;
}) {
  const groupedArticles = group(articles, (a) => a.profile.title);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center gap-x-4 justify-between">
        <SheetMobileMenu links={links} />
        <div className="hidden xl:flex xl:gap-x-4 xl:items-center">
          <ActiveLink
            href={"/"}
            className="font-bold tracking-tight text-base mr-4"
          >
            Azertykeycaps
          </ActiveLink>
          <NavigationMenuNavbar links={links} />
        </div>
        <div className="flex grow xl:grow-0 gap-x-4 items-center xl:mx-4">
          <ActiveLink
            href="/informations"
            className={cn(
              "hidden xl:inline-block transition-colors hover:text-foreground/80 text-foreground/60 text-sm font-medium"
            )}
          >
            Informations
          </ActiveLink>
          <ActiveLink
            href="/dropshipping"
            className={
              "hidden xl:inline-block transition-colors hover:text-foreground/80 text-foreground/60 text-sm font-medium"
            }
          >
            Dropshipping
          </ActiveLink>
          <CommandDialogDemo groupedArticles={groupedArticles} />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
