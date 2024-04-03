import { ChatGPTMessage } from "@/lib/openai-stream";

export type promptType = "textToEmojiCombo" | "emojiComboToText" | "emoji-rich";

export function promptMessage(type: promptType, prompt: string) {
    let messages: ChatGPTMessage[] = [];
    switch (type) {
        case "textToEmojiCombo":
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

                  ## Example:
                    - Input: I love you forever
                    - Output: 😍💘👉👈|The emojis represent intense love (😍), a heart struck by love (💘) and two individuals (represented by fingers pointing towards each other 👉👈) sharing these feelings. This means 'I love you'.|love,romantic,affection
                  `,
              },
              {
                "role": "user",
                "content": prompt
              }
            ];
            break;
        case "emojiComboToText":
            messages = [
              {
                "role": "system",
                "content": `You are an emoji master with incredible emotional awareness and extensive experience using text to translate emoji combos.
                ## Goal: For input emoji combo, translate it into text and provide a clear and easy to understand explanation of the translation.
                ## Example:
                - Input: 😍💘👉👈
                - Output: This means 'I love you'.The emojis represent intense love (😍), a heart struck by love (💘) and two individuals (represented by fingers pointing towards each other 👉👈) sharing these feelings.
                `
              },
              {
                "role": "user",
                "content": prompt
              }
            ];
            break;
        case "emoji-rich":
            messages = [
              {
                "role": "system",
                "content": "Your task is to take the plain text message provided and convert it into an expressive, emoji-rich message that conveys the same meaning and intent. Replace key words and phrases with relevant emojis where appropriate to add visual interest and emotion. Use emojis creatively but ensure the message remains clear and easy to understand. Do not change the core message or add new information."
              },
              {
                "role": "user",
                "content": prompt
              }
            ];
            break;
    }
    return messages;
}