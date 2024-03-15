import { ChatGPTMessage, OpenAIStreamPayload, OpenAIStream } from '../../../utils/OpenAIStream';

if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY");
}

export const POST = async (req: Request): Promise<Response> => {

    const { messages } = (await req.json()) as {
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
                - Excellent emotional intelligence allows you to deeply understand the meaning of words
                - Rich creativity allows you to use emoji to express the meaning of text in the simplest and most intuitive way
                
                ## Constrains:
                - Do not change the message or add new information
                - Make sure your explanation language matches the input language
                
                ## Workflow:
                1. Analyze the overall meaning of the input text
                2. Translate text with appropriate emoji combo
                3. Output translation and explanation  in the input language(maby contains emoji)
                
                ## Output format with Json:
                {
                  "emojis": "<translation result>",
                  "interpretation": "<translation result interpretation>"，
                  "tags": "< 1-3 emotion tags>"
                }
                `,
            },
            {
                "role": "user",
                "content": "I love you forever"
            },
            {
                "role": "assistant",
                "content": `{
                    "emojis": "😍💖🔐⏳",
                    "interpretation": "The heart eyes emoji expresses adoration, the heart with ribbon symbolizes the gift of love, the locked with key represents security and commitment, and the hourglass not done implies an enduring, infinite amount of time, together conveying 'I love you forever.'",
                    "tags": "love, eternity, commitment"
                  }`
            },
            ...messages
        ],
    };

    const stream = await OpenAIStream(payload);
    return new Response(stream);
};
