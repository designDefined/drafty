import { useMemo } from "react";
import { Heading } from "../../../core/entity/Heading";
import { H1, H2, H3, H4, H5, H6 } from "@fluid/core";

type EditableHeadingProps = {
  heading: Heading;
};

export default function EditableHeading({ heading }: EditableHeadingProps) {
  const Heading = useMemo(() => {
    if (heading.importance === 1) return H1;
    if (heading.importance === 2) return H2;
    if (heading.importance === 3) return H3;
    if (heading.importance === 4) return H4;
    if (heading.importance === 5) return H5;
    return H6;
  }, [heading.importance]);

  return <Heading fluid={heading.style?.layout}>{heading.content}</Heading>;
}
