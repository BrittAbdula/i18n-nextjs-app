import Form from "@/components/Form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Emoji Translator | EmojiTell"
}

export default async function Home() {
  return (
    <>
    <Form/>
    </>
  )
}
