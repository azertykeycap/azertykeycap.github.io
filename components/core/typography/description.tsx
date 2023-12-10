import * as React from "react";
import { TypographyP } from "./p";

interface DescriptionProps {
  text: string;
}

export default function Description(props: DescriptionProps): JSX.Element {
  const lines = props.text.split("\n");

  return (
    <TypographyP className="text-xl">
      {lines.map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index !== lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </TypographyP>
  );
}
