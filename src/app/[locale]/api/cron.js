import reflashEmojiCombo from "@/lib/script-updateEmojiCombos";

export default function handler(req, res){
    reflashEmojiCombo(1);
    res.status(200).end('reflashEmojiCombo !');
}