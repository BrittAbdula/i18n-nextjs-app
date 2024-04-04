import Link from "next/link";
import { fetchEmojiComboByURL } from "@/lib/data-emojicombo";
import { EmojiCombo } from "@prisma/client"
import { Metadata, ResolvingMetadata } from "next";
import CopyButton from "@/components/CopyButton";

interface PageProps {
    emojiCombo: EmojiCombo;
}

export async function generateMetadata(
    { params }: { params: { comboURL: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const comboURL = params.comboURL;
    const emojiCombo: EmojiCombo | null = await fetchEmojiComboByURL(comboURL);
    const title = "Meaning of " + emojiCombo?.comboText;
    const description = emojiCombo?.emojis + ": " + emojiCombo?.interpretation?.substring(0, 120) + "...";

    return {
        title: title,
        description: description,
        alternates: {
            canonical: `/emoji-combo/${comboURL}`,
        },
    }
}

export default async function Get({ params }: { params: { comboURL: string } }) {
    const comboURL = params.comboURL;

    const emojiCombo: EmojiCombo | null = await fetchEmojiComboByURL(comboURL);

    // const emojiCombo = params.emojiCombo;
    return (
        <main className="flex flex-1 w-full flex-col  px-4 mt-12 sm:mt-10">

            <section> {/* Container */}
                {emojiCombo ? (
                    <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32"> {/* Title */}
                        <h1 className="text-center text-3xl font-bold md:text-5xl lg:text-left emoji-text">{emojiCombo.emojis}</h1>
                        <h2 className="mb-2 text-xl font-bold md:text-2xl mt-4 ">{emojiCombo.comboText}</h2>
                        <CopyButton text={emojiCombo.emojis} />

                        {/* Content */}
                        <div className="mx-auto">

                            <div className="flex flex-col items-start py-4 ">
                                <p>{emojiCombo.interpretation}</p>
                                <div className="flex mb-4  mt-12">
                                    <div className="mb-4 rounded-md bg-[#f2f2f7] px-2 py-1.5 mr-4">
                                        <p className="text-sm font-semibold text-[#6574f8]">{emojiCombo.tag1}</p>
                                    </div>
                                    <div className="mb-4 rounded-md bg-[#f2f2f7] px-2 py-1.5 mr-4">
                                        <p className="text-sm font-semibold text-[#6574f8]">{emojiCombo.tag2}</p>
                                    </div>
                                    <div className="mb-4 rounded-md bg-[#f2f2f7] px-2 py-1.5 mr-4">
                                        <p className="text-sm font-semibold text-[#6574f8]">{emojiCombo.tag3}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col text-sm text-[#636262] lg:flex-row">
                                    <p>Anonymous</p>
                                    <p className="mx-2 hidden lg:block">-</p>
                                    <p>6 mins</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h1>Emoji Combo Not Found</h1>
                        <p>Sorry, we could not find the emoji combo you were looking for.</p>
                        <p>
                            <Link href="/discovery">Discover more emoji combos</Link>
                        </p>
                    </div>
                )}
            </section>
        </main>
    )
}
