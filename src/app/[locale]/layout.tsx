import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/footer/Footer";
import { locales } from "@/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "EmojiTell",
    template: "%s | EmojiTell"
  },
  description: "EmojiTell helps you translate texts into simple and interesting emoji combinations by AI. It also interprets the translation results, conveying your emotions and feelings through visual expressions."
}

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
