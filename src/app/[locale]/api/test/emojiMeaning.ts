import { fetchEmojiMeaning } from "@/lib/script-initEmojiMeaning";
import { NextApiRequest, NextApiResponse } from 'next';


const getEmojiMeaning  = async (req: NextApiRequest, res: NextApiResponse) => {
    const { n } = req.query;
    const emojis = await fetchEmojiMeaning(Number(n));
    return res.json(emojis);
};

export default getEmojiMeaning ;