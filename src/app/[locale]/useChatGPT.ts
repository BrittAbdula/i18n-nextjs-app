import { useState, useCallback } from "react";
import { ChatGPTMessage } from "@/lib/OpenAIStream";
import { useLocale } from "next-intl";
import { responseAtom } from "@/lib/store";
import { useAtom } from "jotai";

type emojiCombo = {
    "emojis": string,
    "interpretation": string,
    "tags": string[]
}

export function useChatGPT( clear:() => void ) {
    const locale = useLocale();
    const [isLoading, setLoading] = useState(false);
    const [_response, setResponse] = useAtom(responseAtom);
    const [generatedEmojis, setGeneratedEmojis] = useState<emojiCombo>({emojis: "", interpretation: "", tags: []});

    function makeMessage( role: 'user' | 'assistant', content: string): ChatGPTMessage{
        return {
            role,
            content
        }
    }
    
    const generateEmojis = useCallback(async (prompt: string) => {
        if(prompt.length > 140){
            return;
        }
        
        setLoading(true);
        const request = makeMessage('user', prompt);
        const response = await fetch(`/${locale}/api/convert`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages: [ request ],
            })
        });

        if(!response.ok){
            throw new Error(response.statusText);
        }

        const data = response.body;
        if(!data) return;

    //     const responseText = await response.text();
    //     const responseJson = JSON.parse(responseText);
    //     const responseContent = responseJson?.choices?.[0]?.message?.content;
    //     const generatedEmojis = JSON.parse(responseContent) as emojiCombo;
    //     setGeneratedEmojis(generatedEmojis);

    //     clear();
    //     setLoading(false);
    // }, [clear, locale]);

    // const restart = useCallback(() => {
    //     setGeneratedEmojis({emojis: "", interpretation: "", tags: []});
    //     setLoading(false);
    // }, []);

    // return  {generatedEmojis, isLoading, generateEmojis, restart};
    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while(!done){
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        setResponse((prev) => prev + chunkValue);
    }
    setLoading(false);

    return;
}, [locale, setResponse])};