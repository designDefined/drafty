import { ReactNode, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { Div, H1, H2, Main } from "@fluid/core";
import { RootContent } from "mdast";
import rehypeParse from "node_modules/rehype-parse/lib";
import remarkStringify from "node_modules/remark-stringify/lib";
import rehypeRemark from "rehype-remark";
import rehypeSanitize from "rehype-sanitize";
import remarkParse from "remark-parse";
import { unified } from "unified";

import "react-quill/dist/quill.snow.css";

const transform = (node: RootContent | RootContent[]): ReactNode => {
  // console.log(node);
  if (Array.isArray(node)) return node.map(transform);

  switch (node.type) {
    case "code":
      return <code>{node.value}</code>;
    case "text":
      return node.value;
    case "break":
      return `\n`;
    case "heading":
    case "list":
    case "paragraph":
      return <div>{transform(node.children)}</div>;
    case "listItem":
      return transform(node.children);
    case "strong":
      return <strong>{transform(node.children)}</strong>;
    default:
      console.log(node);
      return null;
  }
};

type CombinedText = {
  md: string;
  hype: string;
};

const parseHype = (str: string): string =>
  unified().use(rehypeParse).use(rehypeSanitize).use(rehypeRemark).use(remarkStringify).processSync(str)
    .value as string;

export default function Home() {
  const quillRef = useRef<ReactQuill | null>(null);

  const [value, setValue] = useState<CombinedText>({ hype: "", md: "" });
  const sampleTree = useMemo(() => {
    return unified().use(remarkParse).parse(value.md);
  }, [value.md]);

  return (
    <Main>
      <H2>가나다</H2>
      <H1>Cycloid</H1>
      <Div spacing={[20]}>{sampleTree.children.map(transform)}</Div>
      <Div spacing={[20]}>
        <Div flow={["row"]}>
          <button>get</button>
          <button
            onClick={() => {
              if (quillRef.current) {
                const editor = quillRef.current.getEditor();
                const format = editor.getFormat();
                const selection = editor.getSelection();
                if (!selection) return;
                format["code-block"]
                  ? editor.formatLine(selection.index, selection.length, { ["code-block"]: false })
                  : editor.formatLine(selection.index, selection.length, { ["code-block"]: true });
              }
            }}
          >
            code
          </button>
          <button
            onClick={() => {
              if (quillRef.current) {
                const editor = quillRef.current.getEditor();
                const format = editor.getFormat();
                format.bold ? editor.format("bold", false) : editor.format("bold", true);
              }
            }}
          >
            bold
          </button>
        </Div>
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={value.hype}
          modules={{ toolbar: false }}
          formats={["bold", "code-block"]}
          onChange={(hype) => {
            const md = parseHype(hype);
            console.log(md);
            setValue({ hype, md });
          }}
        />
      </Div>
    </Main>
  );
}
