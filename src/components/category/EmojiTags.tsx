import { fetchEmojiTags } from "@/lib/data-emojicombo";
import { EmojiTag } from "@prisma/client";


const EmojiTags = async () => {
    const emojiTags = await fetchEmojiTags(''); 
    
    return (
        <div className="flex flex-col gap-2">
            <p className="font-semibold">Categories</p>
            <div className="flex flex-wrap items-center gap-2">
                {
                    emojiTags.map((emojiTag: EmojiTag) => (
                        <a key={emojiTag.id} href="#" className="flex gap-3 rounded-md bg-[#f2f2f7] p-3 font-semibold">
                            <p>{emojiTag.tagName}</p>
                        </a>
                    )
                )}
            </div>
        </div>
    )
}

export default EmojiTags;
