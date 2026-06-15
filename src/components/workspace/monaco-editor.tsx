"use client";

import Editor from "@monaco-editor/react";
import { useSessionStore } from "@/store/session-store";

export default function MonacoEditor() {
  const editorCode = useSessionStore((s) => s.editorCode);
  const setEditorCode = useSessionStore((s) => s.setEditorCode);

  return (
    <Editor
      height="100%"
      language="javascript"
      theme="vs-dark"
      value={editorCode}
      onChange={(value) => setEditorCode(value ?? "")}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
      }}
    />
  );
}
