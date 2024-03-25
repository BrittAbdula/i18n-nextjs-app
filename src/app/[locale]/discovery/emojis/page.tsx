import Search from "@/components/search/Search";
import EmojiList from "@/components/emojiList/EmojiList";
import EmojiGroups from "@/components/category/EmojiGroups";

export default async function Discovery({
    searchParams,
}: {
    searchParams?: {
        query?: string;
    }
}) {
    const query = searchParams?.query || "";
    return (
        <main className="flex flex-1 w-full flex-col items-center text-center px-4 mt-12 sm:mt-10">

            <section>
                {/* <!-- Container --> */}
                <div className="mx-auto w-full px-5 py-3 md:px-10 md:py-6">

                {/* <!-- Title --> */}
                <div className="mx-auto text-center">
                    <h2 className="text-3xl font-bold md:text-5xl">Discover your Favorite Emoji Meaning</h2>
                    <p className="mx-auto mb-8 mt-4 max-w-lg text-[#647084] md:mb-12 lg:mb-16">These 3,600+ emojis express love, congratulations, ideas, culture, and more</p>
                </div>
                            {/* <!-- Search input --> */}
                            {<Search placeholder="Search emojis" />}
                {/* <!-- Content --> */}
                <div className="grid gap-10 md:gap-12 lg:grid-cols-[max-content_1fr]">
                    
                    {/* <!-- Filters --> */}
                    <div className="mb-4 max-w-none lg:max-w-sm">


                    {/* <!-- tab --> */}
                    <div className="mx-auto">
                            <ul className="flex flex-wrap justify-center gap-6 items-center">
                            <li className="w-[160px]">
                                <a href="/discovery" className="flex items-center gap-4 rounded-full bg-[#c4c4c4] px-8 py-5 font-bold text-white transition hover:text-black">
                                <p>emojiCombos</p>
                                </a>
                            </li>
                            <li className="w-[160px]">
                                <a href="/discovery/emojis" className="flex items-center gap-4 rounded-full bg-[#c4c4c4] px-8 py-5 font-bold text-white transition hover:text-black">
                                <p>emojis</p>
                                </a>
                            </li>
                            </ul>
                        </div>

                        <form name="wf-form-Filter-2" method="get" className="flex-col gap-6">
                            {/* <!-- Filters title --> */}
                            <div className="mb-6 flex items-center justify-between py-4 [border-bottom:1px_solid_rgb(217,_217,_217)]">
                                <h5 className="text-xl font-bold">Filters</h5>
                            </div>
                            {/* <!-- Categories --> */}
                            <EmojiGroups />
                        </form>
                    </div>
                    {/* <!-- Decor --> */}
                    <div className="w-full [border-left:1px_solid_rgb(217,_217,_217)]">
                    {<EmojiList query={query} />}
                    </div>
                </div>
                </div>
            </section>
        </main>
    )

}
