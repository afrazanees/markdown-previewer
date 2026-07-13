/**
 * Styling for rendered Markdown. This single source of truth is shared by
 * both the live preview (injected into the page) and the exported standalone
 * file, so the download looks exactly like what you see on screen.
 */
export const MARKDOWN_STYLES = `
.markdown-body {
  color: #1e293b;
  font-size: 16px;
  line-height: 1.7;
  word-wrap: break-word;
}
.markdown-body > *:first-child { margin-top: 0; }
.markdown-body > *:last-child { margin-bottom: 0; }
.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  font-weight: 600;
  line-height: 1.25;
  margin: 1.5em 0 0.5em;
}
.markdown-body h1 { font-size: 1.875em; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.3em; }
.markdown-body h2 { font-size: 1.5em; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.3em; }
.markdown-body h3 { font-size: 1.25em; }
.markdown-body h4 { font-size: 1.1em; }
.markdown-body p { margin: 0 0 1em; }
.markdown-body a { color: #2563eb; text-decoration: underline; }
.markdown-body strong { font-weight: 600; }
.markdown-body ul,
.markdown-body ol { margin: 0 0 1em; padding-left: 1.5em; }
.markdown-body ul { list-style: disc; }
.markdown-body ol { list-style: decimal; }
.markdown-body ul ul { list-style: circle; }
.markdown-body li { margin: 0.25em 0; }
.markdown-body blockquote {
  margin: 0 0 1em;
  padding: 0.25em 1em;
  color: #475569;
  border-left: 4px solid #cbd5e1;
  background: #f8fafc;
}
.markdown-body code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.875em;
  background: #f1f5f9;
  padding: 0.2em 0.4em;
  border-radius: 4px;
}
.markdown-body pre {
  background: #0f172a;
  color: #e2e8f0;
  padding: 1em;
  border-radius: 8px;
  overflow-x: auto;
  margin: 0 0 1em;
}
.markdown-body pre code {
  background: transparent;
  color: inherit;
  padding: 0;
  border-radius: 0;
}
.markdown-body table {
  border-collapse: collapse;
  width: 100%;
  margin: 0 0 1em;
  display: block;
  overflow-x: auto;
}
.markdown-body th,
.markdown-body td {
  border: 1px solid #e2e8f0;
  padding: 0.5em 0.75em;
  text-align: left;
}
.markdown-body th { background: #f8fafc; font-weight: 600; }
.markdown-body img { max-width: 100%; height: auto; }
.markdown-body hr { border: 0; border-top: 1px solid #e2e8f0; margin: 1.5em 0; }
`;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Wrap already-sanitized body HTML in a complete, self-contained HTML
 * document with styling baked in, so it opens and looks good on its own.
 */
export function buildExportHtml(bodyHtml: string, title = 'Markdown Export'): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: #f1f5f9;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .page { max-width: 820px; margin: 0 auto; padding: 2.5rem 1.5rem; }
    .markdown-body {
      background: #ffffff;
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
    }
    ${MARKDOWN_STYLES}
  </style>
</head>
<body>
  <main class="page">
    <article class="markdown-body">
${bodyHtml}
    </article>
  </main>
</body>
</html>
`;
}
