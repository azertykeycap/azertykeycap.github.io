"use client";

import React from "react";
import { Copy } from "lucide-react";
import { ClassNameValue } from "tailwind-merge";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { toast, useToast } from "../ui/use-toast";

type CopyButtonProps = {
  url: string;
  className?: ClassNameValue;
};

function CopyButton({ url, className }: CopyButtonProps) {
  const { toast } = useToast();

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              navigator.clipboard.writeText(url);
              toast({
                description: "URL copiée dans le presse-papier avec succès.",
              });
            }}
            className={cn(className)}
          >
            <Copy className="h-[1.2rem] w-[1.2rem] text-card-foreground p-[2px]" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-[280px] text-center py-2">
          <p>
            S&apos;il vous plaît, n&apos;allez pas sur leur site. Cette URL est
            présente seulement à but préventif.
          </p>
          <p className="font-semibold mt-1">
            Néanmoins, vous pouvez cliquer sur ce bouton pour copier l&apos;URL.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default CopyButton;
