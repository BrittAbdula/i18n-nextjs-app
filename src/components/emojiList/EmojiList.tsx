import { fetchEmojis } from "@/lib/data-emojicombo";
import { Emoji } from "@prisma/client";
import Link from "next/link";

const EmojiList = async ( { query, }: { query: string} ) => {
    const emojis = await fetchEmojis(query);
    return (
            <div className="mx-auto max-w-7xl px-5 py-4 md:px-10 md:py-4 lg:py-4">
                <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                    {emojis.map((emoji: Emoji) => (
                        <div key={emoji.id} className="grid gap-8 border border-solid border-[#dfdfdf] p-8 md:p-10">
                        <p className="text-xl font-semibold ">{emoji.emojiChar}</p>
                            <Link href={`/emoji-meaning/${emoji.emojiURL}`}>
                                <p className="text-sm text-[#1A6292]">{emoji.name}</p>
                            </Link>
                        </div>
                    )
                    )}
                </div>
            </div>
    )
}

export default EmojiList;