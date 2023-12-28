import React, { FC } from "react";

interface DTProps {
  children: React.ReactNode;
}

const ArticleDt: FC<DTProps> = ({ children }) => {
  return (
    <dt className="font-semibold text-card-foreground text-sm">{children}</dt>
  );
};

export default ArticleDt;
