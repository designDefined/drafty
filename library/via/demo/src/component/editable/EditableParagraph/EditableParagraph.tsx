import { P } from "@fluid/core";
import { Paragraph } from "../../../core/entity/Paragraph";
import { useStyle } from "../../../hook/useStyle";

type EditableParagraphProps = {
  paragraph: Paragraph;
  isEditMode?: boolean;
};

export default function EditableParagraph({ paragraph }: EditableParagraphProps) {
  const { style, className } = useStyle(paragraph.style);

  return (
    <P
      id={`paragraph-${paragraph.id}`}
      fluid={paragraph.style?.layout}
      className={className}
      style={style}
      onFocus={e => e.stopPropagation()}
      onKeyDown={e => {
        if (e.key === "Enter") e.preventDefault();
      }}
      contentEditable
    >
      {paragraph.content}
    </P>
  );
}
