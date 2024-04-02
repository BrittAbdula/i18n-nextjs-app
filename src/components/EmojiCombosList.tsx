'use client';
import { getEmojiCombos } from "@/lib/action";
import { EmojiCombo } from "@prisma/client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useLocale } from "next-intl";

const EmojiCombosList = ( { initEmojiCombos, query }: { initEmojiCombos: EmojiCombo[], query: string} ) => {
    const NUMBER_OF_USERS_TO_FETCH = 50;
    const locale = useLocale();
    const [offset, setOffset] = useState(initEmojiCombos.length);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [emojiCombos, setEmojiCombos] = useState<EmojiCombo[]>(initEmojiCombos);
    const { ref, inView } = useInView();

    useEffect(() => {
        setEmojiCombos(initEmojiCombos);
        setOffset(initEmojiCombos.length);
        setHasMore(initEmojiCombos.length > 0);
    }, [initEmojiCombos, query]);

    const loadMoreCombos = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const apiEmojiCombos = await getEmojiCombos(locale, offset, NUMBER_OF_USERS_TO_FETCH, query);
            setEmojiCombos([...emojiCombos, ...apiEmojiCombos]);
            setOffset(offset + apiEmojiCombos.length);
            setHasMore(apiEmojiCombos.length > 0);
        }catch(error) {
            console.error('Error loading more items:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(inView && hasMore){
            loadMoreCombos();
        }
    }, [inView]);

    return (
            <div className="mx-auto max-w-7xl px-5 py-4 md:px-10 md:py-4 lg:py-4">
                <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                    {emojiCombos.map((emojiCombo: EmojiCombo) => (<div key={emojiCombo.id} className="grid gap-8 border border-solid border-[#dfdfdf] p-4 md:p-6">
    <Link href={`/emoji-combo/${emojiCombo.comboURL}`}>
        <p className="text-xl font-semibold text-center emoji-text mb-2">{emojiCombo.emojis}</p>
        <p className="text-sm text-center text-[#1A6292]">{emojiCombo.comboText}</p>
    </Link>
</div>
                    ))}
                     {loading && <p>Loading...</p>}
                     {!loading && hasMore && (<div ref={ref} />)}
                    
                </div>
            </div>
    )
}

export default EmojiCombosList;
