import type { Metadata } from 'next';
import { Providers } from './providers';
import '../main.css';

export const metadata: Metadata = {
  title: 'Netflix Clone',
  description: 'A modern movie browsing experience built with Next.js and React',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
