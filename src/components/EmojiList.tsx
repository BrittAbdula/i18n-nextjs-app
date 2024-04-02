'use client';
import { getEmojis } from "@/lib/action";
import { Emoji } from "@prisma/client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useLocale } from "next-intl";

const EmojiList = ( { initEmojis, query }: { initEmojis: Emoji[], query: string} ) => {
    const NUMBER_OF_USERS_TO_FETCH = 30;
    const locale = useLocale();
    const [offset, setOffset] = useState(initEmojis.length);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [emojis, setEmojis] = useState<Emoji[]>(initEmojis);
    const { ref, inView } = useInView();

    useEffect(() => {
        setEmojis(initEmojis);
        setOffset(initEmojis.length);
        setHasMore(initEmojis.length > 0);
    }, [initEmojis, query]);

    const loadMoreEmojis = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const apiEmojis = await getEmojis(locale, offset, NUMBER_OF_USERS_TO_FETCH, query);
            setEmojis([...emojis, ...apiEmojis]);
            setOffset(offset + apiEmojis.length);
            setHasMore(apiEmojis.length > 0);
        }catch(error) {
            console.error('Error loading more items:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(inView && hasMore){
            loadMoreEmojis();
        }
    }, [inView]);

    return (
        <div className="mx-auto max-w-7xl px-5 py-4 md:px-10 md:py-4 lg:py-4 ">
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                    {emojis.map((emoji: Emoji) => (
                        <div key={emoji.id} className="grid gap-2 border border-solid border-[#dfdfdf] p-4 md:p-5">
                        <p className="text-2xl font-semibold text-center emoji-text">{emoji.emojiChar}</p>
                            <Link href={`/emoji-meaning/${emoji.emojiURL}`}>
                                <p className="text-sm text-[#1A6292] text-center">{emoji.name}</p>
                            </Link>
                        </div>
                    )
                    )}
                    {loading && <p>Loading...</p>}
                    {!loading && hasMore && (<div ref={ref} />)}
                </div>
            </div>
    )
}

export default EmojiList;