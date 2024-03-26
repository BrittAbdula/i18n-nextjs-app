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
    console.log('-------------insertEmojiMeaning-----------------', emojiMeaning);
    const newEmojiMeaning = await prisma.emojiMeaning.create({
        data: emojiMeaning
    });
    return newEmojiMeaning;
}


export const fetchEmojiMeaning = async (n: number) => {
    const emojis = await fetchEmojisWithMeanings(n)
    console.log('-------------fetchEmojiMeaning-----------------', emojis);
    const model = 'gpt-4-turbo-preview';
    let i = 0
    await Promise.all(emojis.map(async (emoji) => {
        const emojiChar = emoji.name + ":" + emoji.emojiChar || "";
        const payload: OpenAIStreamPayload = {
            model: model,
            response_format: { type: "json_object" },
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
            console.log('------rawValueJson------', rawValueJson);

            const content = JSON.parse(rawValueJson.choices[0].message.content);
            console.log('------content------', content);
            const emojiMeaning: EmojiMeaningInput = {
                emojiId: content.emojiId,
                interpretation: content.interpretation,
                example1: content.example1,
                example2: content.example2,
                example3: content.example3,
                tag1: content.tag1,
                tag2: content.tag2,
                tag3: content.tag3,
                model: model,
                createdAt: new Date()
            };
            insertEmojiMeaning(emojiMeaning);
            i = i + 1;
        }catch(error){
            console.log(error);
        }
    }));
    console.log('------insertEmojiMeaning---end---', i);
    return emojis;
}
