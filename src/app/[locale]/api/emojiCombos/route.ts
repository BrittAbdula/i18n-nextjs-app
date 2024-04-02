import { fetchEmojiCombos } from "@/lib/data-emojicombo";

export async function Get(req: Request) {
    console.log('req----', req);
    const { searchParams } = new URL(req.url);
    const offset = searchParams.get("offset");
    const limit = searchParams.get("limit");
    const emojiCombos = await fetchEmojiCombos({ offset: Number(offset), limit: Number(limit) });
    console.log('api-----------:', emojiCombos);
    return Response.json(emojiCombos);
    
}