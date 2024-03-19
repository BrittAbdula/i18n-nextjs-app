import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { locales } from "@/navigation";


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children
}: { children: React.ReactNode;
}) {
  const locale = useLocale();
  if (!locales.includes(locale as any)) notFound();
  const messages = useMessages();
  return (
    <html lang={locale}>
    <NextIntlClientProvider locale={locale} messages={messages}>
      <body className={`${inter.className}`}>
        <div className = "flex w-full mx-auto flex-col items-center justify-center py-2 min-h-screen">
          <Header />
              {children}
          <Footer />
        </div>
      </body>
    </NextIntlClientProvider>
    </html>
  );
}
