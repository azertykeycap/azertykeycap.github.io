import * as React from "react";
import { ModeToggle } from "../theme/mode-toggle";
import { NavigationMenuNavbar } from "./menu";
import {
  ShapedNavigationLinksInterface,
  getArticles,
} from "@/lib/api/contentful";
import { cn } from "@/lib/utils";
import { ActiveLink } from "./active-link";
import { CommandDialogDemo } from "../core/command-dialog";
import { group } from "radash";
import SheetMobileMenu from "./sheet-mobile-menu";
import Image from "next/image";

export function Navbar({
  links,
  articles,
}: {
  links: ShapedNavigationLinksInterface;
  articles: Awaited<ReturnType<typeof getArticles>>;
}) {
  const groupedArticles = group(articles, (a) => a.profile.title);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-14 items-center gap-x-4 justify-between">
        <SheetMobileMenu links={links} />
        <div className="hidden xl:flex xl:gap-x-4 xl:items-center">
          <ActiveLink
            href={"/"}
            className="mr-4 xl:flex items-center gap-x-4 text-foreground"
          >
            <Image src={"/logo.png"} width={28} height={28} alt={"Logo"} />
            <span className="font-bold tracking-tight text-base">
              Azertykeycaps
            </span>
          </ActiveLink>
          <NavigationMenuNavbar links={links} />
        </div>
        <div className="flex grow xl:grow-0 gap-x-4 items-center xl:mx-4">
          <ActiveLink href="/dropshipping">Dropshipping</ActiveLink>
          <ActiveLink href="/suggestion">Contact</ActiveLink>
          <ActiveLink href="/informations">Informations</ActiveLink>
          <CommandDialogDemo groupedArticles={groupedArticles} />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
