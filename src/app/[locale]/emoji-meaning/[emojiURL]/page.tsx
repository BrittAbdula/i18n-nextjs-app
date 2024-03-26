import Link from "next/link";
import { fetchEmojiMeaningbyURL } from "@/lib/data-emojicombo";

export default async function Get({ params }: { params: { emojiURL: string } }) {
    const emojiURL = params.emojiURL;

    const emojiDetails = await fetchEmojiMeaningbyURL(emojiURL);
    const emojiDetail = emojiDetails[0];
    return (
        <main className="flex flex-1 w-full flex-col  px-4 mt-12 sm:mt-10">
        <section>
            <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
                {emojiDetail ? (
                    <div className="grid grid-cols-1 items-center gap-8 sm:gap-20 lg:grid-cols-2">
                        {/* <!-- Image --> */}
                        {emojiDetail.emojiChar}
                        {/* <!-- Content --> */}
                        <div className="sm:max-w-sm md:max-w-md lg:max-w-lg">
                            <h1 className="font-bold">{emojiDetail.name}</h1>                                <br />
                                <br />                                <br />
                                <br />
                            <p className="mb-6 max-w-md text-[#636262] md:mb-10 lg:mb-12"> {emojiDetail.EmojiMeaning[0].interpretation}</p>
                                <br />
                                <br />
                            <p className="mb-6 max-w-md text-[#636262] md:mb-10 lg:mb-12"> {emojiDetail.EmojiMeaning[0].example1}</p>
                                <br />
                                <br />
                            <p className="mb-6 max-w-md text-[#636262] md:mb-10 lg:mb-12"> {emojiDetail.EmojiMeaning[0].example2}</p>
                                <br />
                            <p className="mb-6 max-w-md text-[#636262] md:mb-10 lg:mb-12"> {emojiDetail.EmojiMeaning[0].example3}</p>
                                <br />
                                <br />
                            <p className="mb-6 max-w-md text-[#636262] md:mb-10 lg:mb-12"> 
                            #{emojiDetail.EmojiMeaning[0].tag1}
                            <span className="mx-2"></span>
                            #{emojiDetail.EmojiMeaning[0].tag2}
                            <span className="mx-2"></span>
                            #{emojiDetail.EmojiMeaning[0].tag3}
                            </p>
                                <br />
                                <br />
                                <br />                    
                            <div className="flex flex-row">
                            <Link href="/discovery">
                                <h2 className="sm:text-lg text-base font-normal tracking-tight" style={{color: '#1A6292'}}>
                                {/* #{emoji.tag1}  */}
                                </h2>
                            </Link>
                            <span className="mx-2"></span>
                            <Link href="/discovery">
                                <h2 className="sm:text-lg text-base font-normal tracking-tight" style={{color: '#1A6292'}}>
                                {/* #{emoji.tag2}  */}
                                </h2>
                            </Link>
                            <span className="mx-2"></span>
                            <Link href="/discovery">
                                <h2 className="sm:text-lg text-base font-normal tracking-tight" style={{color: '#1A6292'}}>
                                {/* #{emoji.tag3}  */}
                                </h2>
                            </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h1>Emoji Combo Not Found</h1>
                        <p>Sorry, we could not find the emoji you were looking for.</p>
                        <p>
                            <Link href="/discovery">Discover more emojis</Link>
                        </p>
                    </div>
                )}
            </div>
        </section>
        </main>
    )
}
