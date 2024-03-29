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
        
        <main className="isolate">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="relative pt-14">
                    <div
                        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%)',
                            }}
                        />
                    </div>
                    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Discover your Favorite Emoji Meaning</h1>
                        <p className="mt-4 max-w-xl text-sm text-gray-700">These 3,600+ emojis express love, congratulations, ideas, culture, and more</p>
                    </div>

                </div>

                    {/* <!-- Container --> */}
                    <div className="mx-auto w-full px-5 py-3 md:px-10 md:py-6">

                        {/* <!-- Search input --> */}
                            {<Search placeholder="Search emoji" />}

                        {/* <!-- Content --> */}
                        <div className="grid gap-10 md:gap-12 lg:grid-cols-[max-content_1fr]">

                            {/* <!-- Filters --> */}
                            <div className="mb-4 max-w-none lg:max-w-sm">

                                <form name="wf-form-Filter-2" method="get" className="flex-col gap-6">
                                    <EmojiGroups />
                                </form>
                            </div>
                            {/* <!-- Decor --> */}
                            <div className="w-full [border-left:1px_solid_rgb(217,_217,_217)]">
                                    {<EmojiList query={query} />}
                            </div>
                        </div>
                    </div>
            </div>
        </main>

    )

}
