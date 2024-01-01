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
import { ArrowUpRightIcon } from "lucide-react";
import { UAParser } from "ua-parser-js";
import { useRouter } from "next/navigation";

export function CommandDialogDemo({
  groupedArticles,
}: {
  groupedArticles: Partial<
    Record<string, Awaited<ReturnType<typeof getArticles>>>
  >;
  operatingSystem?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { os } = UAParser();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
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
        Rechercher un keyset
        <kbd className="hidden pointer-events-none xl:inline-flex h-5 ml-4 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">
            {os.name && os.name.toLowerCase().includes("macos")
              ? "⌘"
              : "Ctrl +"}
          </span>
          K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Rechercher votre set de touches..." />
        <CommandList>
          <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
          {Object.keys(groupedArticles).map((group, i) => (
            <React.Fragment key={group}>
              <CommandGroup heading={group}>
                {groupedArticles[group]?.map((article, j) => (
                  <CommandItem
                    key={`${article.url}-${i}-${j}`}
                    value={article.title}
                    onSelect={() => {
                      setOpen(false);
                      window.open(article.url, "_blank", "noreferrer");
                    }}
                  >
                    {article.title}
                    <CommandShortcut>
                      <ArrowUpRightIcon className="text-primary" />
                    </CommandShortcut>
                  </CommandItem>
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
