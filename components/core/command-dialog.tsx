"use client";

import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import { Button } from "../ui/button";
import { getArticles } from "@/lib/api/contentful";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

export function CommandDialogDemo({
  groupedArticles,
}: {
  groupedArticles: Partial<
    Record<string, Awaited<ReturnType<typeof getArticles>>>
  >;
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className="font-normal grow xl:grow-0 xl:font-medium"
        onClick={() => setOpen(true)}
      >
        Recherche...
        <kbd className="hidden pointer-events-none xl:inline-flex h-5 ml-4 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Rechercher votre set de touches..." />
        <CommandList>
          <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
          {Object.keys(groupedArticles).map((group) => (
            <React.Fragment key={group}>
              <CommandGroup heading={group}>
                {groupedArticles[group]?.map((article) => (
                  <Link href={article.url} key={article.url} target="_blank">
                    <CommandItem>
                      <span>{article.title}</span>
                      <CommandShortcut>
                        <ArrowUpRightIcon className="text-primary" />
                      </CommandShortcut>
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
