import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Markdown Previewer',
  description: 'A live Markdown editor with split-pane preview and HTML export.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
