'use client';
import { useState, useEffect } from 'react';
import { Emoji } from '@prisma/client';
import { useLocale } from "next-intl";


const Test = () => {
    const [n, setN] = useState(0);
    const locale = useLocale();
    const [emojis, setEmojis] = useState<Emoji[]>([]);
    const [emojiMeanings, setEmojiMeanings] = useState<Emoji[]>([]);

    const processEmojis = async () => {
        const response = await fetch(`/${locale}/api/emojiMeaning?n=${n}`);
        console.log(response);
        const data = await response.json();
        setEmojiMeanings(data);
    };

    const processEmojiCombos = async () => {
        const response = await fetch(`/${locale}/api/emojiCombos?n=${n}`);
    }

    return (
<main className="isolate">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-12">
                <div className="relative pt-14">
                    <div
                        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%)',
                            }}
                        />
                    </div>
            <input type='number' value={n} onChange={(e) => setN(Number(e.target.value))} />
            <button onClick={processEmojis}>Click me</button>
            <button onClick={() => setN(n + 1)}>IncrEmojiCombos</button>
        </div>
        </div>
        </main>
    );
}

export default Test;