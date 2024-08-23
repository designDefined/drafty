import styles from "./styles/styles.module.css";
import { Div, FluidStyle, H6 } from "@fluid/core";
import { CSSProperties, ReactNode, RefObject, useCallback, useEffect, useReducer, useRef } from "react";
import { initialStates, States } from "./types/state";
import { AstTransformResult, initialRoot, Root } from "./types/ast";
import { fromRoot } from "./reactify";
import { stringifyId } from "./utils/id";
import { InlinePosition } from "./types/position";
import { transformAst } from "./parse/ast";
import { toDelta } from "./parse/delta";
import { toKeyState } from "./parse/key";
import { toSelectionState } from "./parse/selection";

type RichTextEditorProps = {
  value: string;
  onChangeValue: (value: string) => void;
  className?: string;
  fluid?: FluidStyle;
  style?: CSSProperties;
};

type Contents = {
  idPrefix: string;
  ref: RefObject<HTMLDivElement>;
  renderCount: number;
  caretPosition?: { start: InlinePosition; end?: InlinePosition };
  contents: ReactNode[];
};
type Reducer = (prev: Contents, action: AstTransformResult) => Contents;
const reducer: Reducer = (prev, action) => {
  if (!action.rerender) return { ...prev };
  return {
    ...prev,
    renderCount: prev.renderCount + 1,
    caretPosition: action.rerender,
    contents: fromRoot(initialRoot, prev.idPrefix),
  };
};

export default function RichTextEditor({ className, fluid, style }: RichTextEditorProps) {
  const root = useRef<Root>(initialRoot);
  const states = useRef<States>(initialStates);

  const idPrefix = useRef("up249hpoaeiwjfpoqiewjf_");
  const editorRef = useRef<HTMLDivElement>(null);
  const [{ contents, renderCount, caretPosition }, dispatchResult] = useReducer<Reducer, null>(reducer, null, () => ({
    idPrefix: idPrefix.current,
    ref: editorRef,
    renderCount: 0,
    contents: fromRoot(root.current, idPrefix.current),
  }));

  const updateRoot = useCallback(() => {
    const delta = toDelta(states.current);
    const result = transformAst(root.current, delta);
    dispatchResult({ ...result });

    // clear states
    states.current.selectionBeforeInput = null;
    states.current.key = null;
    states.current.selectionAfterInput = null;
  }, []);

  useEffect(() => {
    if (!editorRef.current || !caretPosition) return;

    const range = document.createRange();

    const startInlineId = stringifyId(caretPosition.start.inlineId, true, idPrefix.current);
    const startInlineTarget = editorRef.current.querySelector("#" + startInlineId);
    const startInlineNode =
      startInlineTarget && startInlineTarget.childNodes.length > 0
        ? startInlineTarget.childNodes[0]
        : startInlineTarget;
    if (!startInlineNode) return;

    const endInlineId = caretPosition.end
      ? stringifyId(caretPosition.end.inlineId, true, idPrefix.current)
      : startInlineId;
    const endInlineTarget = editorRef.current.querySelector("#" + endInlineId);
    const endInlineNode =
      endInlineTarget && endInlineTarget.childNodes.length > 0 ? endInlineTarget.childNodes[0] : endInlineTarget;
    if (!endInlineNode) return;

    range.setStart(startInlineNode, caretPosition.start.offset);
    range.setEnd(endInlineNode, caretPosition.end ? caretPosition.end.offset : caretPosition.start.offset);

    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }, [renderCount]);

  return (
    <>
      <Div
        key={renderCount}
        ref={editorRef}
        id={idPrefix.current}
        className={`${styles.RichTextEditor} ${className}`}
        fluid={fluid}
        style={style}
        contentEditable
        suppressContentEditableWarning
        onKeyDown={e => {
          states.current.selectionBeforeInput = toSelectionState(window.getSelection());
          states.current.key = toKeyState(e, states.current.selectionBeforeInput);
          if (states.current.key.consume) updateRoot();
        }}
        onInput={() => {
          if (!states.current.selectionBeforeInput || !states.current.key) return;
          states.current.selectionAfterInput = toSelectionState(window.getSelection());
          updateRoot();
        }}
      >
        {contents}
      </Div>
      <Div>
        <H6>AST</H6>
        <Div style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(root.current, null, 2)}</Div>
      </Div>
    </>
  );
}
