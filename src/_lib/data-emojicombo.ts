import { prisma } from "@/prisma";
import { EmojiComboLog, EmojiCombo, EmojiTag } from "@prisma/client";

export type EmojiComboLogCreateInput = Omit<EmojiComboLog, 'id'>;

// insert emoji combo log
export const insertEmojiComboLog = async(log: EmojiComboLogCreateInput) => {
    await prisma.emojiComboLog.create({
        data: log
    })
}

// get emoji combo by combo text
export const fetchEmojiComboByText = async (comboText: string): Promise<EmojiCombo | null> => {
    const comboURL  = comboText.trim().replace(/\s+/g, '-');
    const emojiCombo = await prisma.emojiCombo.findUnique({
        where: {
            comboURL: comboURL
        }
    });

    return emojiCombo;
}

// query emoji combos
export const fetchEmojiCombos = async (query: string): Promise<EmojiCombo[]> => {
    try {
        const emojiCombos = await prisma.emojiCombo.findMany({
            where: {
                comboText: {
                    contains: query
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 30
        });

        return emojiCombos;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to query emoji combos");
    }
}

// get emoji tag
export const fetchEmojiTags = async (tag: string): Promise<EmojiTag[]> => {
    const emojiTag = await prisma.emojiTag.findMany({
        where: {
            tagName: {
                contains: tag
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 10
    });

    return emojiTag;
}

// count the number of emoji combos
export const countEmojiCombos = async (): Promise<number> => {
    const count = await prisma.emojiCombo.count();
    return count;
}