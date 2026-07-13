interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Editor({ value, onChange }: EditorProps) {
  return (
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      spellCheck={false}
      aria-label="Markdown editor"
      placeholder="Type Markdown here..."
      className="min-h-0 w-full flex-1 resize-none bg-white px-6 py-4 font-mono text-sm leading-relaxed text-slate-800 outline-none"
    />
  );
}
