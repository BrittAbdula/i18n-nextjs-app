export type ChatGPTMessage = {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface OpenAIStreamPayload {
    model: string;
    messages: ChatGPTMessage[];
}

export async function OpenAIStream(payload: OpenAIStreamPayload) {
    const openai_URL = "https://api.openai.com/v1/chat/completions"
    // const openai_URL = "https://run.mocky.io/v3/48fd5469-b848-428c-8c56-3ba151e6507c"
    // const openai_URL = "https://run.mocky.io/v3/4000d08e-0149-4e36-aef6-d576a1224683"

    const response = await fetch(openai_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
        return;
    }

    const rawValue = await response.text();

    return rawValue;
}

// mock response:

// {
//     "id": "chatcmpl-94FTYxSrxJvqRPPzWj7J10dzERHxr",
//     "object": "chat.completion",
//     "created": 1710799828,
//     "model": "gpt-4-0125-preview",
//     "choices": [
//       {
//         "index": 0,
//         "message": {
//           "role": "assistant",
//           "content": "{\"emojis\": \"❤️\",\"interpretation\": \"The heart emoji (❤️) is commonly used to represent love. It symbolizes affection and strong emotions towards someone or something.\",\"tags\": [\"emotion\", \"affection\", \"heart\"]}"
//         },
//         "logprobs": null,
//         "finish_reason": "stop"
//       }
//     ],
//     "usage": {
//       "prompt_tokens": 342,
//       "completion_tokens": 52,
//       "total_tokens": 394
//     },
//     "system_fingerprint": "fp_2846ec1ecc"
//   }
  