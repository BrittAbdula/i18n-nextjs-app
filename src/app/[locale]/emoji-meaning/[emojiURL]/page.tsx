import Link from "next/link";
import { fetchEmojiMeaningbyURL } from "@/lib/data-emojicombo";
import { Metadata, ResolvingMetadata } from "next";


export async function generateMetadata(
    { params }: { params: { emojiURL: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const emojiURL = params.emojiURL;
    const emojiDetails = await fetchEmojiMeaningbyURL(emojiURL);
    const title = "Meaning of " + emojiDetails?.name;
    const description = emojiDetails?.EmojiMeaning[0].interpretation?.substring(0, 140) + "...";

    return {
        title: title,
        description: description
    }
}

export default async function Get({ params }: { params: { emojiURL: string } }) {
    const emojiURL = params.emojiURL;
    type sample = {
        Emojimeaning: {
            [example: string] : string
        }
    };

    const emojiDetail = await fetchEmojiMeaningbyURL(emojiURL);
    const sample1 = JSON.parse(emojiDetail?.EmojiMeaning[0].example1 ?? "");
    const key1 = Object.keys(sample1)[0];
    const sample2 = JSON.parse(emojiDetail?.EmojiMeaning[0].example2 ?? "");
    const key2 = Object.keys(sample2)[0];
    const sample3 = JSON.parse(emojiDetail?.EmojiMeaning[0].example3 ?? "");
    const key3 = Object.keys(sample3)[0];
    return (

        <main className="flex flex-1 w-full flex-col  px-4 mt-12 sm:mt-10">
        
            <section> {/* Container */}
                {emojiDetail ? (
                    <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32"> {/* Title */}
                        <h1 className="text-center text-3xl font-bold md:text-5xl lg:text-left">{emojiDetail.emojiChar}</h1>
                        <h2 className="mb-4 mt-4 text-xl font-bold md:text-2xl">{emojiDetail.name}</h2>
                        {/* Content */}
                        <div className="mx-auto grid gap-8 lg:grid-cols-2">
                                <div className="flex flex-col items-start py-8">
                                    <p >{emojiDetail.EmojiMeaning[0].interpretation}</p>
                                    <div className="flex mb-4 mt-12">
                                        <div className="mb-4 rounded-md bg-[#f2f2f7] px-2 py-1.5 mr-4">
                                            <p className="text-sm font-semibold text-[#6574f8]">{emojiDetail.EmojiMeaning[0].tag1}</p>
                                        </div>
                                        <div className="mb-4 rounded-md bg-[#f2f2f7] px-2 py-1.5 mr-4">
                                            <p className="text-sm font-semibold text-[#6574f8]">{emojiDetail.EmojiMeaning[0].tag2}</p>
                                        </div>
                                        <div className="mb-4 rounded-md bg-[#f2f2f7] px-2 py-1.5 mr-4">
                                            <p className="text-sm font-semibold text-[#6574f8]">{emojiDetail.EmojiMeaning[0].tag3}</p>
                                        </div>
                                    </div>
                                </div>
                            <div className="md:flex md:justify-between lg:flex-col">
                                    <div className="flex flex-col items-start pt-4 lg:px-8">
                                        <div className="mb-2 rounded-md bg-[#f2f2f7] px-2 py-1.5">
                                            <p className="text-sm font-semibold text-[#6574f8]">e.g.1</p>
                                        </div>
                                        <p className="mb-2 text-sm font-bold sm:text-base">{key1}</p>
                                        <div className="flex flex-col items-start">
                                            <div className="flex flex-col text-sm text-[#636262] sm:text-base lg:flex-row lg:items-center">
                                                <p>{sample1[key1]}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start pt-4 lg:px-8">
                                        <div className="mb-2 rounded-md bg-[#f2f2f7] px-2 py-1.5">
                                            <p className="text-sm font-semibold text-[#6574f8]">e.g.2</p>
                                        </div>
                                        <p className="mb-2 text-sm font-bold sm:text-base">{key2}</p>
                                        <div className="flex flex-col items-start">
                                            <div className="flex flex-col text-sm text-[#636262] sm:text-base lg:flex-row lg:items-center">
                                                <p>{sample2[key2]}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start pt-4 lg:px-8">
                                        <div className="mb-2 rounded-md bg-[#f2f2f7] px-2 py-1.5">
                                            <p className="text-sm font-semibold text-[#6574f8]">e.g.3</p>
                                        </div>
                                        <p className="mb-2 text-sm font-bold sm:text-base">{key3}</p>
                                        <div className="flex flex-col items-start">
                                            <div className="flex flex-col text-sm text-[#636262] sm:text-base lg:flex-row lg:items-center">
                                                <p>{sample3[key3]}</p>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h1>Emoji Not Found</h1>
                        <p>Sorry, we could not find the emoji  you were looking for.</p>
                        <p>
                            <Link href="/discovery">Discover more emojis</Link>
                        </p>
                    </div>
                )}
            </section>
        </main>
    )
}
