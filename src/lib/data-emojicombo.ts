import { prisma } from "@/prisma";
import { Prisma, EmojiComboLog, EmojiCombo, EmojiTag, Emoji, EmojiMeaning } from "@prisma/client";
import { cache } from "react";

// insert emoji combo log
export const insertEmojiComboLog = async (log: Prisma.EmojiComboLogCreateInput) => {
    //console.log("--------insertEmojiComboLog: ", log);
    console.log('-----8-----insertEmojiComboLog:', new Date(),log);
    try {
        await prisma.emojiComboLog.create({
            data: log
        });
    } catch (error) {
        console.error('-----999-----Failed to insert emoji combo log:', error);
        throw new Error("Failed to insert emoji combo log");
    }finally{
        console.log('-----9-----insertEmojiComboLog:', new Date(),log);
    }
}


// insert emoji combo
export const insertEmojiCombo = async (combo: Prisma.EmojiComboCreateInput) => {
    //console.log("--------insertEmojiComboLog: ", log);
    console.log('-----8-----insertEmojiCombo:', new Date(),combo);
    try {
        await prisma.emojiCombo.create({
            data: combo
        });
    } catch (error) {
        console.error('-----999-----Failed to insert emoji combo:', error);
        throw new Error("Failed to insert emoji combo log");
    }finally{
        console.log('-----9-----insertEmojiCombo:', new Date(),combo);
    }
}

// get Unique emoji combo by URL
export const fetchEmojiComboByURL = cache(async (comboURL: string): Promise<EmojiCombo | null> => {
    const emojiCombo = await prisma.emojiCombo.findUnique({
        where: {
            comboURL: comboURL
        }
    });

    return emojiCombo;
});

// query emoji combos
export const fetchEmojiCombos =cache(async (opts: { query?: string, offset?: number, limit?: number, order?: string}): Promise<EmojiCombo[]> => {
    const query = opts.query;
    const offset = opts.offset || 0;
    const limit = opts.limit || 100;
    const order = opts.order || { id: 'desc' };
    try {
        const emojiCombos = await prisma.emojiCombo.findMany({
            where: {
                comboText: {
                    mode: 'insensitive',
                    contains: query
                }
            },
            orderBy: {
                id: 'desc'
            },
            skip: offset,
            take: limit
        });

        return emojiCombos;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to query emoji combos:");
    }
});

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

//////------------------------- emoji --------------------------------------------------
//fetch emojis
export const fetchEmojis = cache(async (opts: { query?: string, offset?: number, limit?: number, order?: string}): Promise<Emoji[]> => {
    const query = opts.query;
    const offset = opts.offset || 0;
    const limit = opts.limit || 100;
    const order = opts.order || { id: 'desc' };
    try {
        const emojis = await prisma.emoji.findMany({
            where: {
                name: {
                    mode: 'insensitive',
                    contains: query
                },
                EmojiMeaning: {
                    some: {}
                }
            },
            include: {
                EmojiMeaning: true,
            },
            orderBy: {
                id: 'desc'
            },
            skip: offset,
            take: limit
        });
        return emojis;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to query emojis");
    }
});

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
    //console.log('------emojiGroups: ', emojiGroups)

    return emojiGroups.map((group) => group.groupName).filter((name): name is string => name !== null);
}

type EmojiMeaningDetail = Emoji & { EmojiMeaning: EmojiMeaning[] };
export const fetchEmojiMeaningbyURL = async (emojiURL: string): Promise<EmojiMeaningDetail | null> => {
    try {
        const emoji = await prisma.emoji.findFirst({
            where: {
                emojiURL: emojiURL,
            },
            include: {
                EmojiMeaning: true,
            },
            take: 1
        });
        return emoji;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to query emojis with their meanings");
    }
}

// count the number of emojis
export const countEmojis = async (): Promise<number> => {
    const count = await prisma.emojiMeaning.count();
    return count;
}