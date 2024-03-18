import { ChatGPTMessage, OpenAIStreamPayload, OpenAIStream } from '@/lib/OpenAIStream';
import { insertEmojiComboLog, EmojiComboLogCreateInput } from '@/lib/emojicombolog';

if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY");
}


// Use 'localeValue' in your code as needed
export const POST = async (req: Request): Promise<Response> => {

    const { messages } = (await req.json()) as {
        messages: ChatGPTMessage[];
    };

    if(!messages) {
       return new Response("Bad Request");
    }
    const model = 'gpt-4-turbo-preview';

    const payload: OpenAIStreamPayload = {
        model: model,
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

    const rawValue = await OpenAIStream(payload);
    try {
        if (rawValue === undefined) {
          return new Response('An error occurred');
        }
        
        const parsedResponse = JSON.parse(rawValue);
        const choices = parsedResponse.choices;

        if (choices && choices.length > 0) {
        const content = JSON.parse(parsedResponse.choices[0].message.content);
        const emojicombolog: EmojiComboLogCreateInput = {
            uid: 1,
            comboText: messages[0].content,
            emojis: content.emojis ? content.emojis : '',
            lang: 'en',
            interpretation: content.interpretation || null,
            tag1: content.tags ? content.tags[0] || null : null,
            tag2: content.tags ? content.tags[1] || null : null,
            tag3: content.tags ? content.tags[2] || null : null,
            model: model,
            createdAt: new Date()
        };

        // Asynchronously insert the data into the database
        await insertEmojiComboLog(emojicombolog);
        }

        return new Response(rawValue);
    
      } catch (error) {
        console.error('Error:', error);
        return new Response('An error occurred: '+rawValue);
      }
};
