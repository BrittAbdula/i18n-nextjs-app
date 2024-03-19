import { prisma } from "@/prisma";
import { EmojiComboLog, EmojiCombo } from "@prisma/client";

export type EmojiComboLogCreateInput = Omit<EmojiComboLog, 'id'>;

// insert emoji combo log
export const insertEmojiComboLog = async(log: EmojiComboLogCreateInput) => {
    await prisma.emojiComboLog.create({
        data: log
    })
}

// get hot emoji combos
export const fetchHotEmojiCombos = async (): Promise<EmojiCombo[]> => {
    const hotEmojiCombos = await prisma.emojiCombo.findMany({
        take: 10,
        orderBy: {
            createdAt: 'desc'
        }
    });

    return hotEmojiCombos;
}

// get emoji combo by combo text
export const fetchEmojiCombo = async (comboText: string): Promise<EmojiCombo | null> => {
    const emojiCombo = await prisma.emojiCombo.findUnique({
        where: {
            comboText: comboText
        }
    });

    return emojiCombo;
}