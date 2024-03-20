import { fetchHotEmojiCombos } from "@/_lib/data-emojicombo";
import { EmojiCombo } from "@prisma/client";
import Link from "next/link";
import { useTranslations } from "next-intl";

export async function getStaticProps() {
    const hotEmojiCombos = fetchHotEmojiCombos();
    return {
        props: {
            hotEmojiCombos
        }
    }
    revalidate: 5 * 60; // revalidate 5 min

}

export default function Discovery(props: { hotEmojiCombos: EmojiCombo[] }) {
    const hotEmojiCombos = props.hotEmojiCombos
    const t = useTranslations('Discovery');
    // console.log(hotEmojiCombos);
    {

        return (
            <main className="flex flex-1 w-full flex-col items-center text-center px-4 mt-12 sm:mt-10">
                <input type="text" className="mb-10 block h-9 min-h-[44px] w-full rounded-md border border-solid border-[#cccccc] bg-[#f2f2f7] bg-[16px_center] bg-no-repeat py-3 pl-11 pr-4 text-sm font-bold text-[#333333] [background-size:18px] [border-bottom:1px_solid_rgb(215,_215,_221)]" placeholder="Search" />
                <div className="flex flex-col gap-6">
                    <p className="font-semibold">Categories</p>
                    <div className="flex flex-wrap items-center gap-2">
                        <a href="#" className="flex gap-3 rounded-md bg-[#f2f2f7] p-3 font-semibold">
                            <p>Design</p>
                        </a>
                        <a href="#" className="flex gap-3 rounded-md bg-[#f2f2f7] p-3 font-semibold">
                            <p>Illustrations</p>
                        </a>
                        <a href="#" className="flex gap-3 rounded-md bg-[#f2f2f7] p-3 font-semibold">
                            <p>Icons</p>
                        </a>
                        <a href="#" className="flex gap-3 rounded-md bg-[#f2f2f7] p-3 font-semibold">
                            <p>Plugins</p>
                        </a>
                        <a href="#" className="flex gap-3 rounded-md bg-[#f2f2f7] p-3 font-semibold">
                            <p>Color Palette</p>
                        </a>
                    </div>
                </div>


                {/* <!-- Section Features  --> */}
                <section>
                    {/* <!-- Features Container --> */}
                    <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
                        <div className="mx-auto text-center">
                            <h2 className="text-3xl font-bold md:text-5xl">Make every step user-centric</h2>
                            <p className="mx-auto mb-8 mt-4 max-w-lg text-[#647084] md:mb-12 lg:mb-16">Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam,purus sit amet luctus magna fringilla urna</p>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                            {hotEmojiCombos.map((emojiCombo: EmojiCombo) => (
                                <div key={emojiCombo.id} className="grid gap-8 border border-solid border-[#dfdfdf] p-8 md:p-10">
                                <p className="text-xl font-semibold ">{emojiCombo.emojis}</p>
                                    <Link href={`/emoji-combo/${emojiCombo.comboText}`}>
                                        <p className="text-sm text-[#1A6292]">{emojiCombo.comboText}</p>
                                    </Link>
                                </div>
                            )
                            )}
                        </div>
                    </div>
                </section>

            </main>
        )
    }
}