import { fetchEmojiMeaning } from "@/lib/script-initEmojiMeaning";

export async function GET(req: Request){
    const { searchParams } = new URL(req.url);
    const n = searchParams.get('n');
    console.log('-----------getEmojiMeaning--------req.query: ', searchParams);

    console.log('-----------getEmojiMeaning--------n', n);
    const emojis = await fetchEmojiMeaning(Number(n));
    return Response.json(emojis);
};
