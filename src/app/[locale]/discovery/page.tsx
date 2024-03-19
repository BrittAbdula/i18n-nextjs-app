import { fetchHotEmojiCombos } from "@/lib/data-emojicombo";
import { EmojiCombo } from "@prisma/client";
import Link from "next/link";


export const revalidate = 3600; // revalidate every hour

export default async function Discovery() {
    const hotEmojiCombos = await fetchHotEmojiCombos();
    // console.log(hotEmojiCombos);
    {

        return (
            <main className="flex flex-1 w-full flex-col items-center text-center px-4 mt-12 sm:mt-10">
                {hotEmojiCombos.map((emojiCombo: EmojiCombo) => (
                    <div key={emojiCombo.id} className="flex flex-col w-full">
                        <label className="p-2 text-left font-medium flex align-center">
                            <Link href={`/emoji-combo/${emojiCombo.comboText}`}>
                                {emojiCombo.emojis}<span className="mx-2">|</span>{emojiCombo.comboText}
                            </Link>
                        </label>
                    </div>
                    )
                )}
            </main>
        )
    }
}