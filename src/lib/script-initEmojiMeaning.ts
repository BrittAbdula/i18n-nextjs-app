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
        const emojiChar = emoji.emojiChar || "";
        const payload: OpenAIStreamPayload = {
            model: model,
            messages: [
                {
                    role: "system",
                    content: `# Role:
                    You are an emoji master with incredible emotional awareness and extensive experience interpreting emojis.
                    
                    ## Goal: Provide a clear and understandable explanation for the entered emoji, list 3 short use cases, and finally assign it 1-3 tags 
                    
                    ## Skill:
                    - Learn about the latest emoji versions released by the Unicode Consortium and master their interpretation
                    - Rich creativity allows you to interpret the meaning of emojis in the most intuitive and expressive way
                    - Rich emoji usage classic cases and interpretation capabilities
                    
                    ## Directly output a string in json format:
                    {
                    "interpretation": "<Explain the meaning of emoji>",
                    "example": [{"<Case 1>":"<Interpretation 1>"},{"<Case 2>":"<Interpretation 2>"},{"<Case 3>":"<Interpretation 3> "}],
                    "tags": ["<tag1>","<tag2>","<tag3>"]
                    }
                    #sample
                    {"interpretation": "The ❤️ emoji represents the concept of love. It's directly associated with emotions such as affection, passion, and care for someone or something. It can also indicate enthusiasm or liking when referring to people, animals, activities, events, or even food. This emoji is one of the first and mainly used emojis expressing emotion.","example": [{"Expressing love towards someone you are in a romantic relationship with:":"I love you ❤️"},{"Showing a strong liking or enthusiasm for a song:":"I just ❤️ this song!"},{"Appreciating and showing positive feelings towards others’ work:":"You did an awesome job, guys! ❤️"}],"tags": ["Love", "Affection", "Appreciation"]}
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
                emojiId: emoji.id,
                interpretation: content.interpretation,
                example1: JSON.stringify(content.example[0]),
                example2: JSON.stringify(content.example[1]),
                example3: JSON.stringify(content.example[2]),
                tag1: content.tags[0],
                tag2: content.tags[1],
                tag3: content.tags[2],
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
