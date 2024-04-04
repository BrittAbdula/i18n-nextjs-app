import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { locales } from "@/navigation";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://emojitell.com'),
  title: {
    absolute: "",
    default: "EmojiTell",
    template: "%s | EmojiTell"
  },
  description: "EmojiTell helps you translate texts into simple and interesting emoji combinations by AI. It also interprets the translation results, conveying your emotions and feelings through visual expressions.",
  alternates: {
      canonical: `/`,
  }
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
    <GoogleTagManager gtmId="GTM-MN7WSP2Q" />
    <NextIntlClientProvider locale={locale} messages={messages}>
      <body className={`${inter.className}`}>

          <Header />
              {children}
          <Footer />

      </body>
      <GoogleAnalytics gaId="G-NN0PPJW172" />
    </NextIntlClientProvider>
    </html>
  );
}
