import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_SC } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const notoSansSC = Noto_Sans_SC({ subsets: ['latin'], variable: '--font-noto-sans-sc' });

export const metadata: Metadata = {
  title: 'Hanzi Master | Premium Vocabulary Study Tool',
  description: 'Master Mandarin Chinese with our interactive HSK 2.0 & 3.0 vocabulary guide.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${notoSansSC.variable}`}>
        <Navbar />
        <main className="container">
          <header className="layout-header">
            <h1 className="title">Hanzi Master</h1>
            <p className="subtitle">Interactive Mandarin Chinese Vocabulary based on HSK</p>
          </header>
          {children}
          <footer className="layout-footer">
            <p>© {new Date().getFullYear()} Hanzi Master - Elevated Learning</p>
          </footer>
        </main>
      </body>
    </html>
  );
}
