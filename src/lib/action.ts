'use server'
import { EmojiCombo } from "@prisma/client";

export const getEmojiCombos = async (locale: string, offset: number, limit: number) => {
    try{
        const response = await fetch(`/${locale}/api/emojiMeaning?n=1`);
        console.log(response);
        const data = ( await response.json()) as EmojiCombo[];
        return data;
    }catch(error: unknown){
        console.log("Error fetching emoji combos in action: ", error);
        throw new Error("Error fetching emoji combos");
    }
}