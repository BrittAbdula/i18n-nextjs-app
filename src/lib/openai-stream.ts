import {
    ParsedEvent,
    ReconnectInterval,
    createParser,
  } from "eventsource-parser";
import { useLocale } from 'next-intl';
import { prisma } from "@/prisma";
import { EmojiComboLog } from "@prisma/client";

export type EmojiComboLogCreateInput = Omit<EmojiComboLog, 'id'>;

  // insert emoji combo log
  const insertTODatabase = async(locale: string, prompt: string, messageText: string, model: string, startTS: Date) => {
    const messages = messageText.split('|');
    const tags = messages[2] ? messages[2].split(',') : [];
    const emojicombolog = {
        uid: 1,
        comboText: prompt,
        emojis: messages[0] || '',
        lang: locale,
        interpretation: messages[1] || null,
        tag1: tags[0] || null,
        tag2: tags[1] || null,
        tag3: tags[2] || null,
        model: model,
        startTS: startTS,
        createdAt: new Date()
    };

    // Asynchronously insert the data into the database
    await prisma.emojiComboLog.create({
      data: emojicombolog
  })
  }
  
  export type ChatGPTAgent = "user" | "system" | "assistant";
  
  export interface ChatGPTMessage {
    role: ChatGPTAgent;
    content: string;
  }
  
  export interface OpenAIStreamPayload {
    model: string;
    messages: ChatGPTMessage[];
    temperature: number;
    top_p: number;
    frequency_penalty: number;
    presence_penalty: number;
    max_tokens: number;
    stream: boolean;
    n: number;
  }
  
  export async function OpenAIStream(payload: OpenAIStreamPayload, lastPrompt: string) {
    const locale = useLocale();
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const startTS = new Date();
  
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY || ""}`,
      },
      body: JSON.stringify(payload),
    });
  
    let counter = 0;
    let messageText = "";
  
    const stream = new ReadableStream({
      async start(controller) {
        function push(event: ParsedEvent | ReconnectInterval) {
          if (event.type === "event") {
            const { data } = event;
  
            if (data === "[DONE]") {
              controller.close();
              console.log('----------messageText:', messageText);
              insertTODatabase(locale, lastPrompt, messageText, payload.model, startTS)
              return;
            }
  
            try {
              const json = JSON.parse(data);
              console.log(json.choices);
              const text = json.choices[0].delta?.content || "";
  
              if (counter < 2 && (text.match(/\n/) || []).length) {
                return;
              }
  
              const queue = encoder.encode(text);
              controller.enqueue(queue);
              counter++;
              messageText += text;
            } catch (err) {
              controller.error(err);
            }
          }
        }
  
        const parser = createParser(push);
  
        for await (const chunk of res.body as any) {
          parser.feed(decoder.decode(chunk));
        }
      },
    });
  
    return stream;
  }