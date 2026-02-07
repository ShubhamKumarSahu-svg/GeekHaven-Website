import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'GeekHaven Website | IIIT Allahabad',
  description:
    'Official interactive website for GeekHaven Technical Society at IIIT Allahabad, showcasing all wings, coordinators, members, and projects.',
  keywords: [
    'GeekHaven',
    'IIIT Allahabad',
    'Technical Society',
    'CyberSec',
    'GameDev',
    'AI/ML',
    'Design',
    'Web Development',
    'FOSS',
    'Blockchain',
  ],
  authors: [{ name: 'GeekHaven' }],
  openGraph: {
    title: 'GeekHaven Technical Society',
    description:
      'Explore all GeekHaven wings with interactive experiences, member showcases, and project highlights.',
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
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
        {children}
      </body>
    </html>
  );
}
