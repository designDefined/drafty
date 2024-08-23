import { P } from "@fluid/core";
import { Paragraph } from "../../../core/entity/Paragraph";
import { useStyle } from "../../../hook/useStyle";
import RichTextEditor from "../../editor/RichTextEditor/RichTextEditor";

type EditableParagraphProps = {
  paragraph: Paragraph;
  isEditMode?: boolean;
};

export default function EditableParagraph({ paragraph }: EditableParagraphProps) {
  const { style, className } = useStyle(paragraph.style);

  return (
    <RichTextEditor
      value={paragraph.content}
      onChangeValue={value => console.log(value)}
      id={`paragraph-${paragraph.id}`}
      className={className}
      fluid={paragraph.style?.layout}
      style={style}
    />
  );

  return (
    <P id={`paragraph-${paragraph.id}`} fluid={paragraph.style?.layout} className={className} style={style}>
      {paragraph.content}
    </P>
  );
}
