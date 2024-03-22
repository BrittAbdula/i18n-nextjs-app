import Search from "@/components/search/Search";
import EmojiComboList from "@/components/emojiCombosList/emojiCombosList";
import EmojiTags from "@/components/category/emojiTags";

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
                    <h2 className="text-3xl font-bold md:text-5xl">Discover Mesmerizing Aesthetic Emoji Combos😲</h2>
                    <p className="mx-auto mb-8 mt-4 max-w-lg text-[#647084] md:mb-12 lg:mb-16">Explore 40k+ Aesthetic Emoji Combos for everyday situations</p>
                </div>
                            {/* <!-- Search input --> */}
                            {<Search />}
                {/* <!-- Content --> */}
                <div className="grid gap-10 md:gap-12 lg:grid-cols-[max-content_1fr]">
                    {/* <!-- Filters --> */}
                    <div className="mb-4 max-w-none lg:max-w-sm">
                        <form name="wf-form-Filter-2" method="get" className="flex-col gap-6">
                            {/* <!-- Filters title --> */}
                            <div className="mb-6 flex items-center justify-between py-4 [border-bottom:1px_solid_rgb(217,_217,_217)]">
                                <h5 className="text-xl font-bold">Filters</h5>
                                <a href="#" className="text-sm">
                                    <p>Clear all</p>
                                </a>
                            </div>
                            {/* <!-- Categories --> */}
                            <EmojiTags />
                            {/* <!-- Divider --> */}
                            <div className="mb-6 mt-6 h-px w-full bg-[#d9d9d9]"></div>
                            <div className="mb-6 mt-6 h-px w-full bg-[#d9d9d9]"></div>
                            {/* <!-- FIlter One --> */}
                            <div className="flex flex-col gap-6">
                                <div className="flex cursor-pointer items-center justify-between py-4 [border-top:1px_solid_rgba(0,_0,_0,_0)] md:py-0">
                                    <p className="font-semibold">FIlter One</p>
                                    <a href="#" className="inline-block text-sm text-black">
                                        <p>Clear</p>
                                    </a>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="flex items-center text-sm font-medium">
                                        <span className="inline-block cursor-pointer" >Option One</span>
                                    </label>
                                    <label className="flex items-center text-sm font-medium">
                                        <span className="inline-block cursor-pointer" >Option Two</span>
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* <!-- Decor --> */}
                    <div className="w-full [border-left:1px_solid_rgb(217,_217,_217)]">
                    {<EmojiComboList query={query} />}
                    </div>
                </div>
                </div>
            </section>
        </main>
    )

}