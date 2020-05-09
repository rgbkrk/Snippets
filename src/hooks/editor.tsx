import { useEffect, useRef } from "react";

import { EditorView } from "@codemirror/next/view";
import { EditorState, Transaction } from "@codemirror/next/state";

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

/**
 * Set up CodeMirror
 */
export function useCodeMirror(options: {
  text: string;
  setCode: (code: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (ref === null || ref.current === null) {
      return;
    }

    let el = ref.current;
    let myView = new EditorView({
      state: editorState,
      dispatch: (t: Transaction) => {
        if (t.docChanged) {
          options.setCode(t.doc.toString());
        }
        myView.update([t]);
      },
    });

    el.appendChild(myView.dom);
  }, [ref]);

  return [ref];
}
