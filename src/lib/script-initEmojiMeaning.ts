import { prisma } from "@/prisma";
import { EmojiMeaning, Emoji } from "@prisma/client";
import { OpenAIStream, OpenAIStreamPayload } from "@/lib/OpenAIStream";

type EmojiMeaningInput = Omit<EmojiMeaning, 'id'>;

export const fetchEmojisWithMeanings = async (n: number): Promise<Emoji[]> => {
    try {
        const emojis = await prisma.emoji.findMany({
            include: {
                EmojiMeaning: false,
            },
            take: n
        });
        return emojis;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to query emojis with their meanings");
    }
}

const insertEmojiMeaning = async (emojiMeaning: EmojiMeaningInput): Promise<EmojiMeaning> => {
    const newEmojiMeaning = await prisma.emojiMeaning.create({
        data: emojiMeaning
    });
    return newEmojiMeaning;
}


export const fetchEmojiMeaning = async (emojiChar: string) => {
    const emojis = await fetchEmojisWithMeanings(1)
    console.log('-------------fetchEmojiMeaning-----------------', emojis);
    const model = 'gpt-4-turbo-preview';
    let i = 0
    emojis.map(async (emoji) => {
        const emojiChar = emoji.emojiChar || "";
        const payload: OpenAIStreamPayload = {
            model: model,
            messages: [
                {
                    role: "system",
                    content: `# Role:
                    You are an emoji master with incredible emotional awareness and extensive experience interpreting emojis.
                    
                    ## Goal: Provide a clear and understandable explanation for the entered emoji, list 3 short use cases, and finally assign it 1-3 tags use janpanese
                    
                    ## Skill:
                    - Learn about the latest emoji versions released by the Unicode Consortium and master their interpretation
                    - Rich creativity allows you to interpret the meaning of emojis in the most intuitive and expressive way
                    - Rich emoji usage classic cases and interpretation capabilities
                    
                    
                    ## Output format:
                    ### Json
                    {
                      "interpretation": "<Explain the meaning of emoji>",
                      "example": [{"<Case 1>":"<Interpretation 1>"},{"<Case 2>":"<Interpretation 2>"},{"<Case 3>":"<Interpretation 3> "}],
                      "tags": "<1-3 tags>"
                    }
                    `
                },
                {
                    role: "user",
                    content: emojiChar
                },
            ],
            stream: false
        };
        const rawValue = await OpenAIStream(payload);
        console.log('------res------', rawValue);
        try{
            if (rawValue === undefined) {
                throw new Error("Failed to get emoji meaning");
            }
            const rawValueJson = JSON.parse(rawValue);
            const emojiMeaning: EmojiMeaningInput = {
                emojiId: rawValueJson.emojiId,
                interpretation: rawValueJson.interpretation,
                example1: rawValueJson.example1,
                example2: rawValueJson.example2,
                example3: rawValueJson.example3,
                tag1: rawValueJson.tag1,
                tag2: rawValueJson.tag2,
                tag3: rawValueJson.tag3,
                model: model,
                createdAt: new Date()
            };
            insertEmojiMeaning(emojiMeaning);
            i = i + 1;
        }catch(error){
            console.log(error);
        }
    })
    console.log('------insertEmojiMeaning---end---', i);
}
