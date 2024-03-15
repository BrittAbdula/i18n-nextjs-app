import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { notFound } from 'next/navigation';
import { useLocale } from "next-intl";


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children
}: { children: React.ReactNode;
}) {
  const locale = useLocale();
  return (
    <html lang={locale}>
      <body className={inter.className}>
            {children}
      </body>
    </html>
  );
}
