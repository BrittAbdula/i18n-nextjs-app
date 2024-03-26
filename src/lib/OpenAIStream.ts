export type ChatGPTMessage = {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface OpenAIStreamPayload {
    model: string;
    messages: ChatGPTMessage[];
    response_format?: { type: string };
    stream?: false | true;
}

export async function OpenAIStream(payload: OpenAIStreamPayload) {
    console.log('--------------OpenAIStream payload', payload)
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
    console.log('======OpenAIStream=======rawValue: ', rawValue);

    return rawValue;
}
