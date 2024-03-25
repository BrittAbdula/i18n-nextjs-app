import { locales } from "@/navigation";
import { notFound } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useMessages, NextIntlClientProvider } from "next-intl";
import Form from "@/components/form/Form";



export default function Home() {

  return (
    <>
    <Form />
    </>
  )
}
