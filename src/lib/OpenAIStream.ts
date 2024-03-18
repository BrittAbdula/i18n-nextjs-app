export type ChatGPTMessage = {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface OpenAIStreamPayload {
    model: string;
    messages: ChatGPTMessage[];
}

export async function OpenAIStream(payload: OpenAIStreamPayload) {
    // const openai_URL = "https://api.openai.com/v1/chat/completions"
    // const openai_URL = "https://run.mocky.io/v3/75eda1e3-2976-4979-a3f9-fb8728c2181a"
    const openai_URL = "https://run.mocky.io/v3/48fd5469-b848-428c-8c56-3ba151e6507c"

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
//     "id": "chatcmpl-123",
//     "object": "chat.completion",
//     "created": 1677652288,
//     "model": "gpt-3.5-turbo-0125",
//     "system_fingerprint": "fp_44709d6fcb",
//     "choices": [{
//       "index": 0,
//       "message":   {"role": "assistant","content":"{\"emojis\": \"😍💖🔐⏳\",\"interpretation\": \"The heart eyes emoji expresses adoration, the heart with ribbon symbolizes the gift of love, the locked with key represents security and commitment.\",\"tags\": [\"love\", \"eternity\", \"commitment\"]"},
//       "logprobs": null,
//       "finish_reason": "stop"
//     }],
//     "usage": {
//       "prompt_tokens": 9,
//       "completion_tokens": 12,
//       "total_tokens": 21
//     }
//   }