import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'HSK Master | Premium Vocabulary Study Tool',
  description: 'Master Mandarin Chinese with our interactive HSK 2.0 & 3.0 vocabulary guide.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container">
          <header className="layout-header">
            <h1 className="title">HSK Master</h1>
            <p className="subtitle">Interactive Mandarin Chinese Vocabulary</p>
          </header>
          {children}
          <footer className="layout-footer">
            <p>© {new Date().getFullYear()} HSK Master - Elevated Learning</p>
          </footer>
        </main>
      </body>
    </html>
  );
}
