import { locales } from "@/navigation";
import { notFound } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useMessages, NextIntlClientProvider } from "next-intl";
import IndexComponent from "@/components/indexComponent/IndexComponent";



export default function Home() {

  return (
    <IndexComponent />
  )
}
