import React, { FC } from "react";

interface DLProps {
  children: React.ReactNode;
  itemProp?: string;
}

const ArticleDl: FC<DLProps> = ({ children, itemProp }) => {
  return (
    <dl
      itemProp={itemProp}
      className="w-full grid grid-cols-[2fr_3fr] gap-y-1 items-center px-6"
    >
      {children}
    </dl>
  );
};

export default ArticleDl;
