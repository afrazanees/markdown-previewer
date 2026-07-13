import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Configure marked once for the whole app.
marked.setOptions({
  gfm: true, // GitHub-flavored markdown (tables, strikethrough, etc.)
  breaks: true, // treat single newlines as line breaks
});

/**
 * Convert a Markdown string into sanitized HTML that is safe to inject
 * into the DOM.
 *
 * Sanitizing with DOMPurify means a pasted `<script>` (or `onerror`
 * handler, etc.) is stripped before it ever reaches the page. This relies
 * on the browser `window`, so it must only run client-side.
 */
export function renderMarkdown(markdown: string): string {
  const rawHtml = marked.parse(markdown, { async: false }) as string;
  return DOMPurify.sanitize(rawHtml);
}
