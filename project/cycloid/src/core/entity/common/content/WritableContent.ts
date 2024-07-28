import { WRITABLE_CONTENT_TYPE } from "../../../constant/content/writableContentType";
import { TextStyle } from "../style/Style";

export type TextContent = {
  type: WRITABLE_CONTENT_TYPE["TEXT"];
  content: string;
};
export type StyledTextContent = {
  type: WRITABLE_CONTENT_TYPE["STYLED_TEXT"];
  content: string;
  classes?: string[];
  stlye?: TextStyle;
};

export type WritableContent = TextContent | StyledTextContent;
