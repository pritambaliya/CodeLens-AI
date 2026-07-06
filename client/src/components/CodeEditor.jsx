import Editor from '@monaco-editor/react';

export default function CodeEditor({
  value,
  onChange,
  language = 'javascript',
  height = '400px',
  readOnly = false,
  className = '',
}) {
  return (
    <div className={`overflow-hidden rounded-xl border border-white/10 ${className}`}>
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={onChange}
        theme="vs-dark"
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: 'JetBrains Mono, monospace',
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
          roundedSelection: true,
          cursorBlinking: 'smooth',
          smoothScrolling: true,
        }}
      />
    </div>
  );
}
