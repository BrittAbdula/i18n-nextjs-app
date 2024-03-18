import { prisma } from "@/prisma";
import { EmojiComboLog } from "@prisma/client";

export type EmojiComboLogCreateInput = Omit<EmojiComboLog, 'id'>;

// insert emoji combo log
export const insertEmojiComboLog = async(log: EmojiComboLogCreateInput) => {
    console.log("insertEmojiComboLog", log);
    await prisma.emojiComboLog.create({
        data: log
    })
}

