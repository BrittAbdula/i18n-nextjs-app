import Link from "next/link";
import { fetchEmojiCombo } from "@/lib/data-emojicombo";
import { EmojiCombo } from "@prisma/client";

export default async function Get({ params }: { params: { comboText: string } }) {
    const comboText = params.comboText;
    const emojiCombo = await fetchEmojiCombo(comboText);
    return (
        <>
        {emojiCombo ? (
            <div>
                <h1>Emoji Combo: {emojiCombo.comboText}</h1>
                <p>Emojis: {emojiCombo.emojis}</p>
                <p>Interpretation: {emojiCombo.interpretation}</p>
                <p>Tags: {emojiCombo.tag1}</p>
                <p>Tags: {emojiCombo.tag2}</p>
                <p>Tags: {emojiCombo.tag3}</p>
            </div>
        ) : (
            <div>
                <h1>Emoji Combo Not Found</h1>
                <p>Sorry, we couldn't find the emoji combo you were looking for.</p>
                <p>
                    <Link href="/discovery">Discover more emoji combos</Link>
                </p>
            </div>
        )}
        </>
    )
}
