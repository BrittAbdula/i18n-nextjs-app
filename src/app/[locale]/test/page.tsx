'use client';
import { fetchEmojisWithMeanings } from "@/lib/script-initEmojiMeaning";
import { useState, useEffect } from 'react';
import { Emoji, EmojiMeaning } from '@prisma/client';


const Test = () => {
    const [n, setN] = useState(0);
    const [emojis, setEmojis] = useState<Emoji[]>([]);
    const [emojiMeanings, setEmojiMeanings] = useState<Emoji[]>([]);

    const processEmojis = async () => {
        const response = await fetch(`/api/emojiMeaning?id=${n}`);
        const data = await response.json();
        console.log(data);
        setEmojiMeanings(data);
    };

    useEffect(() => {
        const fetchEmojis = async () => {
            const emojis = await fetchEmojisWithMeanings(3);
            setEmojis(emojis);
        }
        fetchEmojis();
    }, []);

    return (
        <div>
            <input type='number' value={n} onChange={(e) => setN(Number(e.target.value))} />
            <button onClick={processEmojis}>Click me</button>
            {emojis.map((emoji) => (
                <div key={emoji.id}>
                    <p>{emoji.emojiChar}</p>
                    <p>{emoji.name}</p>
                </div>
            ))}
        </div>
    );
}

export default Test;