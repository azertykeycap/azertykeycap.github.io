import { cn } from "@/lib/utils";
import React, { FC } from "react";
import { ClassNameValue } from "tailwind-merge";

interface DLProps {
  children: React.ReactNode;
  className?: ClassNameValue;
  itemProp?: string;
}

const ArticleDl: FC<DLProps> = ({ children, className, itemProp }) => {
  return (
    <dl
      itemProp={itemProp}
      className={cn(
        "w-full grid grid-cols-[2fr_3fr] gap-y-1 items-center px-6",
        className
      )}
    >
      {children}
    </dl>
  );
};

export default ArticleDl;
