'use client';
import { useState, useEffect } from 'react';
import { Emoji } from '@prisma/client';
import { useLocale } from "next-intl";
import { Metadata } from 'next';



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

    return (
        <div>
            <input type='number' value={n} onChange={(e) => setN(Number(e.target.value))} />
            <button onClick={processEmojis}>Click me</button>

        </div>
    );
}

export default Test;