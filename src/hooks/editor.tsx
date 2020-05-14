/**
 * The useCodeMirror hook provides a way to mount a CodeMirror 6 editor on to a ref.
 *
 * CodeMirror 6: https://codemirror.net/6/
 * CodeMirror 6 Manual: https://codemirror.net/6/docs/ref/
 *
 * Example use:
 *
 * const [editorRef, thinAPI] = useCodeMirror()
 *
 * // Later, in your React element return...
 *
 * <div ref={editorRef} />
 *
 */

import { useEffect, useRef, useState } from "react";

import { EditorView } from "@codemirror/next/view";
import { EditorState, Transaction } from "@codemirror/next/state";

/** CodeMirror extensions */
import { keymap } from "@codemirror/next/keymap";
import {
  history,
  redo,
  redoSelection,
  undo,
  undoSelection,
} from "@codemirror/next/history";
import { foldCode, unfoldCode, foldGutter } from "@codemirror/next/fold";
import { lineNumbers } from "@codemirror/next/gutter";
import { baseKeymap, indentSelection } from "@codemirror/next/commands";
import { bracketMatching } from "@codemirror/next/matchbrackets";
import { closeBrackets } from "@codemirror/next/closebrackets";
import { specialChars } from "@codemirror/next/special-chars";
import { multipleSelections } from "@codemirror/next/multiple-selections";
import { search, defaultSearchKeymap } from "@codemirror/next/search";
import { autocomplete } from "@codemirror/next/autocomplete";
import { javascript } from "@codemirror/next/lang-javascript";
import { defaultHighlighter } from "@codemirror/next/highlight";

/** Types for our "Thin CodeMirror API" */
type ApplyTransaction = (transaction: Transaction) => Transaction;

// Our Thin API on CodeMirror, for React devs to use
type CodeMirrorThin = {
  /**
   * `apply` allows for applying transactions to the CodeMirror document without having access
   * to the CodeMirrorView or a particular CodeMirrorState
   *
   * NOTE: CodeMirror is outside of React's purview, so it's up to CodeMirror when to render
   * updates from an `apply` call. You're just letting it know what to change. It's pretty smart
   * about knowing when to batch up changes before rendering them, much like React itself
   *
   * Here's an example transaction of replacing all the code contents.
   *
   * thinAPI.apply((t: Transaction) => {
   *   // Replace the text document from start to end with code
   *   transaction.replace(0, transaction.doc.length, code);
   * });
   */
  apply: (fn: ApplyTransaction) => void;
};

/**
 * Set up CodeMirror
 */
export function useCodeMirror(options: {
  text?: string;
  onChange?: (code: string) => void;
}): [React.RefObject<HTMLDivElement>, CodeMirrorThin] {
  const ref = useRef<HTMLDivElement>(null);

  const [thinAPI, setThinAPI] = useState<CodeMirrorThin>({
    apply: () => {
      throw new Error("CodeMirror ref must be set in order to use the API");
    },
  });

  useEffect(() => {
    // This should _not_ happen unless ref doesn't get set by the parent
    if (ref === null || ref.current === null) {
      throw new Error("ref must be allocated for useCodeMirror");
    }

    const jsCompletions = "break case catch class const continue debugger default delete do else enum export extends false finally for function if implements import interface in instanceof let new package private protected public return static super switch this throw true try typeof var void while with yield"
      .split(" ")
      .concat(Object.getOwnPropertyNames(window));
    const isMac = /Mac/.test(navigator.platform);

    const editorState = EditorState.create({
      doc: options.text,
      extensions: [
        lineNumbers(),
        history(),
        specialChars(),
        foldGutter(),
        multipleSelections(),
        javascript(),
        search({ keymap: defaultSearchKeymap }),
        defaultHighlighter,
        bracketMatching(),
        closeBrackets,
        autocomplete({
          override(state, pos, cx) {
            // @ts-ignore
            let prefix = /[\w$]*$/.exec(
              state.doc.slice(Math.max(0, pos - 30), pos)
            )[0];
            if (!prefix) return [];
            return jsCompletions
              .filter((str) => cx.filter(str, prefix))
              .map((str) => ({
                label: str,
                start: pos - prefix.length,
                end: pos,
              }));
          },
        }),
        keymap({
          "Mod-z": undo,
          "Mod-Shift-z": redo,
          "Mod-u": (view) => undoSelection(view) || true,
          [isMac ? "Mod-Shift-u" : "Alt-u"]: redoSelection,
          "Ctrl-y": isMac ? undefined : redo,
          "Shift-Tab": indentSelection,
          "Mod-Alt-[": foldCode,
          "Mod-Alt-]": unfoldCode,
        }),
        keymap(baseKeymap),
      ],
    });

    let el = ref.current;
    let myView = new EditorView({
      state: editorState,
      dispatch: (t: Transaction) => {
        if (t.docChanged && options.onChange) {
          options.onChange(t.doc.toString());
        }
        myView.update([t]);
      },
    });

    setThinAPI({
      apply: (fn: ApplyTransaction) => {
        const transaction = myView.state.t();
        const t = fn(transaction);
        myView.dispatch(t);
      },
    });

    el.appendChild(myView.dom);
    // We only want this hook to run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, thinAPI];
}
