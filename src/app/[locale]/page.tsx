import { locales } from "@/navigation";
import { notFound } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { useMessages, NextIntlClientProvider } from "next-intl";
import IndexComponent from "@/components/indexComponent/IndexComponent";



export default function Home() {
  const locale = useLocale();
  if (!locales.includes(locale as any)) notFound();
  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex w-full mx-auto flex-col items-center justify-center py-2 min-h-screen">
        <Header />
        <IndexComponent />
        <Footer />
      </div>
    </NextIntlClientProvider>
  )
}
