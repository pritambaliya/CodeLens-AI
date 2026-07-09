import { useRef } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor({
  value,
  onChange,
  language = "javascript",
  height = "500px",
  readOnly = false,
  className = "",
}) {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
    editor.focus();
  }

  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 ${className}`}
    >
      <Editor
        height={height}
        theme="vs-dark"
        language={language}
        value={value}
        defaultValue=""
        onChange={(value) => onChange(value || "")}
        onMount={handleEditorDidMount}
        options={{
          readOnly,

          automaticLayout: true,
          minimap: { enabled: false },

          fontSize: 15,
          fontFamily: "'JetBrains Mono', Consolas, 'Courier New', monospace",
          fontLigatures: true,

          lineNumbers: "on",
          glyphMargin: true,
          folding: true,
          foldingHighlight: true,

          wordWrap: "on",
          wordWrapColumn: 120,

          scrollBeyondLastLine: false,
          smoothScrolling: true,
          mouseWheelZoom: true,

          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          cursorStyle: "line",

          renderWhitespace: "selection",
          renderLineHighlight: "all",
          bracketPairColorization: { enabled: true },
          guides: {
            bracketPairs: true,
            indentation: true,
          },

          autoClosingBrackets: "always",
          autoClosingQuotes: "always",
          autoIndent: "advanced",
          formatOnPaste: true,
          formatOnType: true,

          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          snippetSuggestions: "inline",

          tabSize: 2,
          insertSpaces: true,
          detectIndentation: true,

          padding: {
            top: 12,
            bottom: 12,
          },
        }}
      />
    </div>
  );
}