import {
    ParsedEvent,
    ReconnectInterval,
    createParser,
  } from "eventsource-parser";
import { useLocale } from 'next-intl';
import { insertEmojiComboLog } from "./data-emojicombo";
import { promptType } from "./prompts";

  // insert emoji combo log
  const insertTODatabase = async(locale: string, proType: promptType, prompt: string, messageText: string, model: string, startTS: Date, responTS: Date) => {
    const messages = messageText.split('|');
    const tags = messages[2] ? messages[2].split(',') : [];
    const emojicombolog = {
        uid: 1,
        promptType: proType,
        comboText: prompt,
        emojis: messages[0] || '',
        lang: locale,
        interpretation: messages[1] || null,
        tag1: tags[0]?.trim() || null,
        tag2: tags[1]?.trim() || null,
        tag3: tags[2]?.trim() || null,
        model: model,
        messageText: messageText,
        startTS: startTS,
        responTS: responTS,
        createdAt: new Date()
    };

    // Asynchronously insert the data into the database
    console.log('-----7-----insertEmojiComboLog [start]:', new Date(),emojicombolog);
    await insertEmojiComboLog(emojicombolog);
    console.log('-----10-----insertEmojiComboLog [end]:', new Date());
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
  
  export async function OpenAIStream(payload: OpenAIStreamPayload, proType: promptType) {
    const lastPrompt = payload.messages[payload.messages.length - 1].content;
    const locale = useLocale();
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const startTS = new Date();
    console.log('-----4-----OpenAIStream start:', new Date(),lastPrompt);
  
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY || ""}`,
      },
      body: JSON.stringify(payload),
    });
    console.log('-----5-----OpenAIStream request openai status:', new Date(), res.status);
  
    let counter = 0;
    let messageText = "";
  
    const stream = new ReadableStream({
      async start(controller) {
        function streamParser(event: ParsedEvent | ReconnectInterval) {
          if (event.type === "event") {
            const { data } = event;
  
            if (data === "[DONE]") {
              controller.close();
              //console.log('----------messageText:', messageText);
              console.log('-----6-----OpenAIStream [DONE]:', new Date(),messageText);
              const responTS = new Date();
              insertTODatabase(locale, proType, lastPrompt, messageText, payload.model, startTS, responTS)
              return;
            }
  
            try {
              const json = JSON.parse(data);
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
  
        const parser = createParser(streamParser);
  
        for await (const chunk of res.body as any) {
          parser.feed(decoder.decode(chunk));
        }
      },
    });
  
    return stream;
  }