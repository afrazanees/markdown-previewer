# Markdown Previewer

A simple live Markdown editor. Type Markdown on the left, see the rendered result on the right, and export it as a clean HTML file.

## Features
- Live split-pane preview that updates as you type
- Export the rendered output as a standalone HTML file
- Copy the generated HTML to the clipboard
- Sanitized output (safe against script injection)
- Responsive layout for mobile and desktop

## Tech
Next.js, TypeScript, Tailwind CSS, marked, DOMPurify

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000 in your browser.

## Production build
```bash
npm run build
npm run start
```

## Project structure
```
app/         # layout, page (split-pane UI), global styles
components/   # Editor (textarea) and Preview (sanitized HTML)
lib/         # markdown rendering (marked + DOMPurify) and HTML export
```
