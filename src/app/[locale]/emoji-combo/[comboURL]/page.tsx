import Link from "next/link";
import { fetchEmojiComboByText } from "@/_lib/data-emojicombo";

export default async function Get({ params }: { params: { comboURL: string } }) {
    const comboURL = params.comboURL;
    console.log('---------------comboURL:',comboURL);

    const emojiCombo = await fetchEmojiComboByText(comboURL);
    return (
        <main className="flex flex-1 w-full flex-col  px-4 mt-12 sm:mt-10">
        <section>
            <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
                {emojiCombo ? (
                    <div className="grid grid-cols-1 items-center gap-8 sm:gap-20 lg:grid-cols-2">
                        {/* <!-- Image --> */}
                        {emojiCombo.emojis}
                        {/* <!-- Content --> */}
                        <div className="sm:max-w-sm md:max-w-md lg:max-w-lg">
                            <h1 className="font-bold">{emojiCombo.comboText}</h1>                                <br />
                                <br />                                <br />
                                <br />
                            <p className="mb-6 max-w-md text-[#636262] md:mb-10 lg:mb-12"> {emojiCombo.interpretation}
                                <br />
                                <br />
                                 
                            </p>                           
                            <div className="flex flex-row">
                            <Link href="/discovery">
                                <h2 className="sm:text-lg text-base font-normal tracking-tight" style={{color: '#1A6292'}}>
                                #{emojiCombo.tag1} 
                                </h2>
                            </Link>
                            <span className="mx-2"></span>
                            <Link href="/discovery">
                                <h2 className="sm:text-lg text-base font-normal tracking-tight" style={{color: '#1A6292'}}>
                                #{emojiCombo.tag2} 
                                </h2>
                            </Link>
                            <span className="mx-2"></span>
                            <Link href="/discovery">
                                <h2 className="sm:text-lg text-base font-normal tracking-tight" style={{color: '#1A6292'}}>
                                #{emojiCombo.tag3} 
                                </h2>
                            </Link>
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
            </div>
        </section>
        </main>
    )
}
