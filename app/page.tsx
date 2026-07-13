'use client';

import { useEffect, useRef, useState } from 'react';
import Editor from '@/components/Editor';
import Preview from '@/components/Preview';
import { renderMarkdown } from '@/lib/markdown';
import { buildExportHtml, MARKDOWN_STYLES } from '@/lib/exportHtml';

const SAMPLE = [
  '# Markdown Previewer',
  '',
  'Type **Markdown** on the left and watch the *preview* update on the right.',
  '',
  '## Features',
  '- Live preview as you type',
  '- Export to a standalone HTML file',
  '- Copy the rendered HTML',
  '- Safe, sanitized output',
  '',
  '## Code',
  'Inline `code` and fenced blocks:',
  '',
  '```js',
  'function greet(name) {',
  '  return `Hello, ${name}!`;',
  '}',
  '```',
  '',
  '## Quote',
  '> "Simplicity is the soul of efficiency." — Austin Freeman',
  '',
  '## Table',
  '| Feature | Status |',
  '| ------- | ------ |',
  '| Editor  | Ready  |',
  '| Preview | Ready  |',
  '| Export  | Ready  |',
  '',
  '[Learn more about Markdown](https://www.markdownguide.org)',
  '',
].join('\n');

export default function Home() {
  const [markdown, setMarkdown] = useState(SAMPLE);
  const [html, setHtml] = useState('');
  const [copied, setCopied] = useState(false);
  const isFirstRender = useRef(true);

  // Render immediately on first mount, then debounce subsequent edits so
  // typing stays smooth. Rendering happens here (client-side) because
  // DOMPurify needs the browser `window`.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setHtml(renderMarkdown(markdown));
      return;
    }

    const timer = setTimeout(() => {
      setHtml(renderMarkdown(markdown));
    }, 200);

    return () => clearTimeout(timer);
  }, [markdown]);

  const handleExport = () => {
    const doc = buildExportHtml(html);
    const blob = new Blob([doc], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'markdown-export.html';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard access can fail (e.g. denied permissions); ignore quietly.
    }
  };

  return (
    <div className="flex h-screen flex-col bg-slate-50 text-slate-900">
      {/* Shared Markdown styling, kept in sync with the exported file. */}
      <style dangerouslySetInnerHTML={{ __html: MARKDOWN_STYLES }} />

      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3">
        <h1 className="text-lg font-semibold">Markdown Previewer</h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
          >
            {copied ? 'Copied!' : 'Copy HTML'}
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            Export HTML
          </button>
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col md:flex-row">
        <section className="flex min-h-0 flex-1 flex-col border-b border-slate-200 md:border-b-0 md:border-r">
          <div className="px-4 py-2 text-xs font-medium uppercase tracking-wide text-slate-500">
            Editor
          </div>
          <Editor value={markdown} onChange={setMarkdown} />
        </section>

        <section className="flex min-h-0 flex-1 flex-col">
          <div className="px-4 py-2 text-xs font-medium uppercase tracking-wide text-slate-500">
            Preview
          </div>
          <div className="min-h-0 flex-1 overflow-auto bg-white px-6 py-4">
            <Preview html={html} />
          </div>
        </section>
      </main>
    </div>
  );
}
