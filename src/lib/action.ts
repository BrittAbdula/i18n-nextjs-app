'use server'
import { EmojiCombo, Emoji } from "@prisma/client";
import { fetchEmojiCombos, fetchEmojis } from "./data-emojicombo";

export const getEmojiCombos = async (locale: string, offset: number, limit: number, query: string) => {
    try{
        const emojiCombos = await fetchEmojiCombos({offset: offset, limit: limit, query: query});
        return emojiCombos;
    }catch(error: unknown){
        console.log("Error fetching emoji combos in action: ", error);
        throw new Error("Error fetching emoji combos");
    }
}
export const getEmojis = async (locale: string, offset: number, limit: number, query: string) => {
    try{
        const emojis = await fetchEmojis({offset: offset, limit: limit, query: query});
        return emojis;
    }catch(error: unknown){
        console.log("Error fetching emoji in action: ", error);
        throw new Error("Error fetching emoji");
    }
}