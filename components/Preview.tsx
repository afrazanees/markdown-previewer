interface PreviewProps {
  html: string;
}

export default function Preview({ html }: PreviewProps) {
  return (
    <div
      className="markdown-body"
      // `html` is sanitized in lib/markdown.ts before it reaches here.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
