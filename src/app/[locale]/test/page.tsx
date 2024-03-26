'use client';
import { useState, useEffect } from 'react';
import { Emoji } from '@prisma/client';


const Test = () => {
    const [n, setN] = useState(0);
    const [emojis, setEmojis] = useState<Emoji[]>([]);
    const [emojiMeanings, setEmojiMeanings] = useState<Emoji[]>([]);

    const processEmojis = async () => {
        const response = await fetch(`/api/emojiMeaning?id=${n}`);
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