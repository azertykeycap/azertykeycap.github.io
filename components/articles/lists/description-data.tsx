import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React, { FC } from "react";

interface DDProps extends VariantProps<typeof DDVariants> {
  children: React.ReactNode;
  itemProp?: string;
}

const DDVariants = cva("text-sm", {
  variants: {
    variant: {
      default: "flex gap-2 text-muted-foreground",
      status:
        "flex w-fit items-center bg-secondary/90 text-secondary-foreground rounded-md px-2 py-1 text-xs font-bold uppercase",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const ArticleDd: FC<DDProps> = ({ children, itemProp, variant }) => {
  return (
    <dd className={cn(DDVariants({ variant }))} itemProp={itemProp}>
      {children}
    </dd>
  );
};

export default ArticleDd;
