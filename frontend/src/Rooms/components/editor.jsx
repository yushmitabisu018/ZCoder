import React, { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap, historyKeymap } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import ACTIONS from "../Actions";
import { closeBrackets } from "@codemirror/autocomplete";

const Editor = ({ socketRef, roomId, onCodeChange, code }) => {
  const editorDiv = useRef(null);
  const viewRef = useRef(null);
  const isRemoteUpdate = useRef(false); // suppress re-broadcasts on remote changes

  useEffect(() => {
    if (!editorDiv.current) return;

    const state = EditorState.create({
      doc: "",
      extensions: [
        keymap.of([...defaultKeymap, ...historyKeymap]),
        javascript(),
        oneDark,
        closeBrackets(),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const newCode = update.state.doc.toString();
            onCodeChange(newCode);

            // Emit only local changes
            if (!isRemoteUpdate.current) {
              socketRef.current?.emit(ACTIONS.CODE_CHANGE, { roomId, code: newCode });
            }
          }
        }),
      ],
    });

    viewRef.current = new EditorView({
      state,
      parent: editorDiv.current,
    });

    return () => {
      viewRef.current.destroy();
    };
  }, [roomId]);

  // Update editor content when `code` prop changes (e.g., SYNC_CODE)
  useEffect(() => {
    if (!viewRef.current) return;

    const currentCode = viewRef.current.state.doc.toString();
    if (code !== currentCode) {
      isRemoteUpdate.current = true;
      viewRef.current.dispatch({
        changes: { from: 0, to: currentCode.length, insert: code },
      });
      isRemoteUpdate.current = false;
    }
  }, [code]);

  // Listen to remote CODE_CHANGE events and update editor
  useEffect(() => {
    if (!socketRef.current) return;

    const handleRemoteCodeChange = ({ code: remoteCode }) => {
      if (!viewRef.current) return;

      const currentCode = viewRef.current.state.doc.toString();
      if (remoteCode === currentCode) return;

      isRemoteUpdate.current = true;
      viewRef.current.dispatch({
        changes: { from: 0, to: currentCode.length, insert: remoteCode },
      });
      isRemoteUpdate.current = false;

      if (typeof onCodeChange === "function") {
        onCodeChange(remoteCode);
      }
    };

    socketRef.current.on(ACTIONS.CODE_CHANGE, handleRemoteCodeChange);

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE, handleRemoteCodeChange);
    };
  }, [socketRef, onCodeChange]);

  return <div ref={editorDiv} style={{ height: "100%", width: "100%" }} />;
};

export default Editor;
