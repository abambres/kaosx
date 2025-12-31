import type { Metadata } from "next";
import { Inter, Space_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: "KAOS* 2.x ─ UnLeashed 🔥",
  description: "The Good Kind.",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-black">
      <body className={`${inter.variable} ${spaceMono.variable} font-sans antialiased text-white`}>
        {children}
      </body>
    </html>
  );
}
