'use client';
import { fetchEmojiCombos } from "@/lib/data-emojicombo";
import { getEmojiCombos } from "@/lib/action";
import { EmojiCombo } from "@prisma/client";
import { inView } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useLocale } from "next-intl";

const EmojiCombosList = ( { initEmojiCombos }: { initEmojiCombos: EmojiCombo[]} ) => {
    const locale = useLocale();
    const NUMBER_OF_USERS_TO_FETCH = 5;
    const [offset, setOffset] = useState(NUMBER_OF_USERS_TO_FETCH);
    const [emojiCombos, setEmojiCombos] = useState<EmojiCombo[]>(initEmojiCombos);
    const {ref, inView} = useInView();

    const loadMoreCombos = async () => {
        const apiEmojiCombos = await getEmojiCombos(locale, offset, NUMBER_OF_USERS_TO_FETCH);
        setEmojiCombos([...emojiCombos, ...apiEmojiCombos]);
        setOffset(offset + NUMBER_OF_USERS_TO_FETCH);
    };

    useEffect(() => {
        if(inView){
            loadMoreCombos();
        }
    }, [inView]);

    return (
            <div className="mx-auto max-w-7xl px-5 py-4 md:px-10 md:py-4 lg:py-4">
                <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                    {emojiCombos.map((emojiCombo: EmojiCombo) => (
                        <div key={emojiCombo.id} className="grid gap-8 border border-solid border-[#dfdfdf] p-8 md:p-10">
                        <p className="text-xl font-semibold text-center ">{emojiCombo.emojis}</p>
                            <Link href={`/emoji-combo/${emojiCombo.comboURL}`}>
                                <p className="text-sm  text-center text-[#1A6292]">{emojiCombo.comboText}</p>
                            </Link>
                        </div>
                    )
                    )}
                    <div  ref={ref}>
                        Loading...
                    </div>
                </div>
            </div>
    )
}

export default EmojiCombosList;
