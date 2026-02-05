import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'GeekHaven Terminal | IIIT Allahabad',
  description: 'Web-based terminal interface for GeekHaven Technical Society',
  keywords: [
    'GeekHaven',
    'IIIT Allahabad',
    'Terminal',
    'Technical Society',
    'CyberSec',
  ],
  authors: [{ name: 'GeekHaven' }],
  openGraph: {
    title: 'GeekHaven Terminal',
    description: 'Interactive terminal for GeekHaven Technical Society',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/icon.png" />
      </head>
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
        {children}
      </body>
    </html>
  );
}
