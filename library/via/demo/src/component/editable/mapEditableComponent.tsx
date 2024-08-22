import { Block } from "../../core/entity/Block";
import { Code } from "../../core/entity/Code";
import { Heading } from "../../core/entity/Heading";
import { Image } from "../../core/entity/Image";
import { Paragraph } from "../../core/entity/Paragraph";
import EditableBlock from "./EditableBlock/EditableBlock";
import EditableHeading from "./EditableHeading/EditableHeading";
import EditableParagraph from "./EditableParagraph/EditableParagraph";

type Entities = Block | Heading | Paragraph | Image | Code;

export const mapEditableComponent = (entity: Entities) => {
  switch (entity.type) {
    case "BLOCK":
      return <EditableBlock key={entity.id} block={entity} />;
    case "HEADING":
      return <EditableHeading key={entity.id} heading={entity} />;
    case "PARAGRAPH":
      return <EditableParagraph key={entity.id} paragraph={entity} />;
    default:
      return <div></div>;
  }
};
