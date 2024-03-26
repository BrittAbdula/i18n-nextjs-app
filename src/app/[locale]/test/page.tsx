import { fetchEmojisWithMeanings,fetchEmojiMeaning } from "@/lib/script-initEmojiMeaning";

const test = async () => {
    const emojis = await fetchEmojisWithMeanings(30);
    const name = async () => {
        await fetchEmojiMeaning(2);
    }
    //console.log(emojis);
    return (
        <div>
            <button onClick={name}>Click me</button>
            {emojis.map((emoji) => (
                <div key={emoji.id}>
                    <p>{emoji.emojiChar}</p>
                    <p>{emoji.name}</p>
                </div>
            ))}
        </div>
    );
}

export default test;