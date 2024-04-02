import { OpenAIStream, OpenAIStreamPayload,ChatGPTMessage } from "@/lib/openai-stream";
import emojiRegex from 'emoji-regex';

if (!process.env.OPENAI_API_KEY) throw new Error("Missing OpenAI API Key");

function isOnlyEmoji(str: string): boolean {
  const regex = emojiRegex();
  const matches = str.match(regex);
  return matches !== null && matches.join('') === str;
}

export const POST = async (req: Request) => {
  // console.log('-----1-----covert route:', new Date(),req);
  const { prompt } = (await req.json()) as { prompt: string };
  let messages: ChatGPTMessage[] = [];

  if (!prompt) return new Response("Missing prompt", { status: 400 });
  if (isOnlyEmoji(prompt)){
    messages = [
      {
        "role": "system",
        "content": "Your task is to take the plain text message provided and convert it into an expressive, emoji-rich message that conveys the same meaning and intent. Replace key words and phrases with relevant emojis where appropriate to add visual interest and emotion. Use emojis creatively but ensure the message remains clear and easy to understand. Do not change the core message or add new information."
      },
      {
        "role": "user",
        "content": prompt
      },
      {
        "role": "assistant",
        "content": prompt
      },
      {
        "role": "user",
        "content": prompt
      }
    ]
  }else if (prompt.length > 300) {
    return new Response("Prompt is too long", { status: 400 });
  }else if (prompt.length <= 1) {
    return new Response("Prompt is too short", { status: 400 });
  }else if (prompt.length > 100) {
     messages = [
      {
        "role": "system",
        "content": "You are an emoji master with incredible emotional awareness and extensive experience using text to translate emoji combos.Your task is to parse the meaning of emoji combos"
      },
      {
        "role": "user",
        "content": "😍💘👉👈"
      },
      {
        "role": "assistant",
        "content": "The emojis represent intense love (😍), a heart struck by love (💘) and two individuals (represented by fingers pointing towards each other 👉👈) sharing these feelings. This means 'I love you'."
      },
      {
        "role": "user",
        "content": prompt
      }
    ];
  }else {
    messages = [
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
  }

  const payload: OpenAIStreamPayload = {
    // model: "gpt-3.5-turbo",
    model: "gpt-4-turbo-preview",
    messages: messages,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 600,
    stream: true,
    n: 1,
  };

  console.log('-----2-----request OpenAIStream payload:', new Date(),payload);
  const stream = await OpenAIStream(payload);
  console.log('-----3-----request OpenAIStream stream:', new Date(),stream);

  return new Response(stream);
};