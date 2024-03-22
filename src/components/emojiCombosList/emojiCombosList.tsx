import { fetchEmojiCombos } from "@/_lib/data-emojicombo";
import { EmojiCombo } from "@prisma/client";
import Link from "next/link";

const EmojiComboList = async ( { query, }: { query: string} ) => {
    const emojiCombos = await fetchEmojiCombos(query);
    return (
            <div className="mx-auto max-w-7xl px-5 py-4 md:px-10 md:py-4 lg:py-4">
                <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                    {emojiCombos.map((emojiCombo: EmojiCombo) => (
                        <div key={emojiCombo.id} className="grid gap-8 border border-solid border-[#dfdfdf] p-8 md:p-10">
                        <p className="text-xl font-semibold ">{emojiCombo.emojis}</p>
                            <Link href={`/emoji-combo/${emojiCombo.comboText}`}>
                                <p className="text-sm text-[#1A6292]">{emojiCombo.comboText}</p>
                            </Link>
                        </div>
                    )
                    )}
                </div>
            </div>
    )
}

export default EmojiComboList;