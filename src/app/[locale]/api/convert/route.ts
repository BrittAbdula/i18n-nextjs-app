import { OpenAIStream, OpenAIStreamPayload, ChatGPTMessage } from "@/lib/openai-stream";
import emojiRegex from 'emoji-regex';
import { promptType, promptMessage } from "@/lib/prompts";

if (!process.env.OPENAI_API_KEY) throw new Error("Missing OpenAI API Key");

function isOnlyEmoji(str: string): boolean {
  const regex = emojiRegex();
  const matches = str.match(regex);
  return matches !== null && matches.join('') === str;
}

export const POST = async (req: Request) => {
  const { prompt } = (await req.json()) as { prompt: string };
  let messages: ChatGPTMessage[] = [];
  let proType: promptType = "textToEmojiCombo";

  if (!prompt) return new Response("Missing prompt", { status: 400 });

  // Check prompt length choice different prompt message
  if (prompt.length > 500) {
    return new Response("Prompt is too long", { status: 400 });
  } else if (prompt.length <= 1) {
    return new Response("Prompt is too short", { status: 400 });
  } else if (isOnlyEmoji(prompt)) {
    proType = "emojiComboToText";
    messages = promptMessage(proType, prompt);
  } else if (prompt.length > 100) {
    proType = "emoji-rich";
  } else {
    proType = "textToEmojiCombo";
  }
  messages = promptMessage(proType, prompt);

  console.log('-----1-----covert route--promptType:', new Date(), proType);

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

  console.log('-----2-----request OpenAIStream payload:', new Date(), payload);
  const stream = await OpenAIStream(payload, proType);
  console.log('-----3-----request OpenAIStream stream:', new Date(), stream);

  return new Response(stream);
};