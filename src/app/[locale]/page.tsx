import Form from "@/components/Form";
import { Metadata } from "next";
import { EmojiCombo } from "@prisma/client";
import { fetchEmojiCombos } from "@/lib/data-emojicombo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free AI Emoji Translator | EmojiTell"
}

export default async function Home() {
  const emojiCombos = await fetchEmojiCombos({ offset: 0, limit: 9 });
  return (
    <>
      <Form />
      <div className="mx-auto max-w-7xl px-5 py-4 md:px-10 md:py-4 lg:py-4">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Discover Mesmerizing Aesthetic Emoji Combos😲</h1>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {emojiCombos.map((emojiCombo: EmojiCombo) => (<div key={emojiCombo.id} className="grid gap-8 border border-solid border-[#dfdfdf] p-4 md:p-6">
            <Link href={`/emoji-combo/${emojiCombo.comboURL}`}>
              <p className="text-xl font-semibold text-center emoji-text mb-2">{emojiCombo.emojis}</p>
              <p className="text-sm text-center text-[#1A6292]">{emojiCombo.comboText}</p>
            </Link>
          </div>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-4 py-4 sm:px-4 lg:px-6 text-center">
        <Link href={`/discovery`}> <span className="text-l font-bold" style={{ color: '#9933FF' }}>More Emoji combos {'>>'} </span></Link>
      </div>
    </>
  )
}
