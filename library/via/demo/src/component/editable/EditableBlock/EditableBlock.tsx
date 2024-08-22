import { Div } from "@fluid/core";
import { Block } from "../../../core/entity/Block";
import { mapEditableComponent } from "../mapEditableComponent";
import { useStyle } from "../../../hook/useStyle";

type EditableBlockProps = {
  block: Block;
  isEditMode?: boolean;
};

export default function EditableBlock({ block }: EditableBlockProps) {
  const { style, className } = useStyle(block.style);
  return (
    <Div id={`block-${block.id}`} fluid={block.style?.layout} className={className} style={style}>
      {block.children.map(mapEditableComponent)}
    </Div>
  );
}
