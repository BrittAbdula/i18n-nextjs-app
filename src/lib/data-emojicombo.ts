import { prisma } from "@/prisma";
import { EmojiComboLog, EmojiCombo, EmojiTag, Emoji } from "@prisma/client";

export type EmojiComboLogCreateInput = Omit<EmojiComboLog, 'id'>;

// insert emoji combo log
export const insertEmojiComboLog = async(log: EmojiComboLogCreateInput) => {
    //console.log("--------insertEmojiComboLog: ", log);
    try {
        await prisma.emojiComboLog.create({
            data: log
        });
    } catch (error) {
        console.log(error);
        throw new Error("Failed to insert emoji combo log");
    }
}

// get Unique emoji combo by URL
export const fetchEmojiComboByURL = async (comboURL: string): Promise<EmojiCombo | null> => {
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

//////------------------------- emoji
//fetch emojis
export const fetchEmojis = async (query: string): Promise<Emoji[]> => {
    try {
        const emojis = await prisma.emoji.findMany({
            where: {
                name: {
                    contains: query
                }
            },
            take: 30
        });
        return emojis;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to query emojis");
    }
}

// fetch Unique emoji by id
export const fetchEmojiByEmojiURL = async (emojiURL: string): Promise<Emoji | null> => {
    const emoji = await prisma.emoji.findUnique({
        where: {
            emojiURL: emojiURL
        }
    });

    return emoji;
}

// fetch emoji groups
export const fetchEmojiGroups = async (): Promise<string[]> => {
    const emojiGroups = await prisma.emoji.findMany({
        distinct: ['groupName']
    });
    console.log('------emojiGroups: ', emojiGroups)

    return emojiGroups.map((group) => group.groupName).filter((name): name is string => name !== null);
}