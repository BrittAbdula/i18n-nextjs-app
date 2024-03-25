import { fetchEmojiGroups } from "@/lib/data-emojicombo";


const EmojiGroups = async () => {
    const emojiGroups = await fetchEmojiGroups(); 
    
    return (
        <div className="flex flex-col gap-6">
            <p className="font-semibold">Groups</p>
            <div className="flex flex-wrap items-center gap-2">
                {
                    emojiGroups.map((emojiGroup: string) => (
                        <a key={emojiGroup} href="#" className="flex gap-3 rounded-md bg-[#f2f2f7] p-3 font-semibold">
                            <p>{emojiGroup}</p>
                        </a>
                    )
                )}
            </div>
        </div>
    )
}

export default EmojiGroups;