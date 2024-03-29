import { OpenAIStream, OpenAIStreamPayload,ChatGPTMessage } from "@/lib/openai-stream";

if (!process.env.OPENAI_API_KEY) throw new Error("Missing OpenAI API Key");

export const POST = async (req: Request) => {
  const { prompt } = (await req.json()) as { prompt: string };
  const messages: ChatGPTMessage[] = [
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
        Output "emoticon" | "explanation" | "label" separated by "|"
        `,
    },
    {
        "role": "user",
        "content": "I love you forever"
    },
    {
        "role": "assistant",
        "content": `😍💘👉👈|The emojis represent intense love (😍), a heart struck by love (💘) and two individuals (represented by fingers pointing towards each other 👉👈) sharing these feelings. This means 'I love you'.|love,romantic,affection`
    },
    {
      "role": "user",
      "content": prompt
    }
]

  if (!prompt) return new Response("Missing prompt", { status: 400 });

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    // model: "gpt-4-turbo-preview",
    messages: messages,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 600,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload, prompt);

  return new Response(stream);
};