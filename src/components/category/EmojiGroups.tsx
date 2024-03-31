import { fetchEmojiGroups } from "@/lib/data-emojicombo";
import Link from "next/link";


const EmojiGroups = async () => {
    const emojiGroups = await fetchEmojiGroups(); 
    
    return (
        <div className="flex flex-col gap-4">
            <p className="font-semibold">Groups</p>
            <div className="flex flex-wrap items-center gap-2">
                {
                    emojiGroups.map((emojiGroup: string) => (
                        <Link key={emojiGroup} href="#" className="flex gap-3 rounded-md bg-[#f2f2f7] p-3 font-semibold">
                            <p>{emojiGroup}</p>
                        </Link>
                    )
                )}
            </div>
        </div>
    )
}

export default EmojiGroups;