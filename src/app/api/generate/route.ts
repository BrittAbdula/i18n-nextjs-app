import { ChatGPTMessage, OpenAIStreamPayload, OpenAIStream } from '../../../utils/OpenAIStream';
import { Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { useLocale } from "next-intl";

const locale = useLocale();

if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY");
}

type emojiCombo = {
    "emojis": string,
    "interpretation": string,
    "tags": string[]
}

// request 内容验证

// 调用 OpenAI API 的返回写入数据库
const saveEmojiComboLog = async (emojiComboLogInput: any) => {
    try {
        const emojiComboLog = await prisma.emojiComboLog.create({
            data: emojiComboLogInput
        });
        console.log("insert emojiComboLog Successful, id:  ", emojiComboLog.id)
    } catch (error) {
        console.error(error);
    }
}

export const POST = async (req: Request): Promise<Response> => {

    const { messages } = (await req.json() ) as {
        messages: ChatGPTMessage[];
    };

    if(!messages) {
        return new Response("Bad Request", {
            status: 400
        });
    }   

    const payload: OpenAIStreamPayload = {
        model: 'gpt-4-turbo-preview',
        messages: [
            {
                "role": "system",
                "content": `# Role:
                You are an emoji master with incredible emotional awareness and extensive experience using emojis to translate text.
                
                ## Goal: For input text, translate it into impressive emojis and provide a clear and easy to understand explanation  of the translation
                
                ## Skill:
                - Learn about the latest emoji version released by the Unicode consortium and master their interpretation
                - Rich creativity allows you to use emoji to express the meaning of text in the simplest and most intuitive way
                - Be good at summarizing content and forming tags
                
                ## Constrains:
                - Do not change the message or add new information
                - Make sure your explanation language matches the input language
                
                ## Workflow:
                1. Analyze the overall meaning of the input text
                2. Translate text with appropriate emoji combo
                3. Output translation
                4. Explain the meaning of each emoji and summarize the translation results, ensure information is clear and understandable
                5. Add 1-3 tags to the input text
                
                ## Output format:
                The output in JSON format contains three keys: 'emojis', 'interpretation', and 'tags'
                `,
            },
            {
                "role": "user",
                "content": "I love you forever"
            },
            {
                "role": "assistant",
                "content": `{"emojis": "😍💘👉👈","interpretation": "The emojis represent intense love (😍), a heart struck by love (💘) and two individuals (represented by fingers pointing towards each other 👉👈) sharing these feelings. This means 'I love you'.","tags": ["love", "romantic", "affection"]}`
            },
            ...messages
        ],
    };

    // Call OpenAI API
    const stream = await OpenAIStream(payload);
    let responseJson = {choices: {messages: {content: ""}}};

    if (typeof stream === 'string' && stream.trim().startsWith('{')) {
        const responseJson = JSON.parse(stream);
    }

    // Save the emoji combo log to the database
    try {
        const responseContent = responseJson?.choices?.[0]?.message?.content;
        const generatedEmojis = JSON.parse(responseContent) as emojiCombo;
        const emojiComboLog: Prisma.EmojiComboLogCreateInput = {
            uid: 0,
            comboText: messages[-1].content,
            emojis: generatedEmojis.emojis,
            lang: locale,
            interpretation: generatedEmojis.interpretation,
            tag1: generatedEmojis.tags[0] || "",
            tag2: generatedEmojis.tags[1] || "",
            tag3: generatedEmojis.tags[2] || "",
            model: 'gpt-4-turbo-preview',
            createdAt: new Date()
        };
        await saveEmojiComboLog(emojiComboLog);
    } catch (error) {
        console.error(error);
    }

    return new Response(stream);
};
