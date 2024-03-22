import { useState, useCallback } from "react";
import { ChatGPTMessage } from "@/_lib/OpenAIStream";
import { useLocale } from "next-intl";
import { url } from "inspector";

type emojiCombo = {
    "emojis": string,
    "interpretation": string,
    "tags": string[]
}

export function useChatGPT( clear:() => void ) {
    const locale = useLocale();
    const [isLoading, setLoading] = useState(false);
    const [conversation, setConversation] = useState<ChatGPTMessage[]>([]);
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
        setConversation(sofar => [...sofar, request]);
        const response = await fetch(`/${locale}/api/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages: [...conversation, request]
            })
        });

        if(!response.ok){
            throw new Error(response.statusText);
        }

        const data = response.body;
        if(!data){
            return;
        }

        const responseText = await response.text();
        const responseJson = JSON.parse(responseText);
        const responseContent = responseJson?.choices?.[0]?.message?.content;
        const generatedEmojis = JSON.parse(responseContent) as emojiCombo;
        setGeneratedEmojis(generatedEmojis);

        const reply = makeMessage('assistant', responseContent);
        setConversation(sofar => [...sofar, reply]);


        clear();
        setLoading(false);
    }, [conversation, clear]);

    const restart = useCallback(() => {
        setConversation([]);
        setGeneratedEmojis({emojis: "", interpretation: "", tags: []});
        setLoading(false);
    }, []);

    return  {generatedEmojis, isLoading, generateEmojis, restart};
}

