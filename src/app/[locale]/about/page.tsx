import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
    description: "EmojiTell helps you translate texts into simple and interesting emoji combinations by AI. It also interprets the translation results, conveying your emotions and feelings through visual expressions.",
    alternates: {
        canonical: `/emojis`,
    },
}

const values = [
    {
      name: 'What is EmojiTell?',
      description:
        'EmojiTell is a web-based Emojis translator crafted specifically for you. Our core functionality is translating the text you input into aesthetically appealing emoji combinations. Not only can it help you express your unique feelings about life, but it can also assist you in communicating and sharing joy online.',
    },
    {
      name: 'How does EmojiTell work?',
      description:
        'All you need to do is input some text, and EmojiTell will generate corresponding emoji combinations that are emotive and aesthetically pleasing. These combinations can accurately express your ideas and emotions.',
    },
    {
      name: 'Did you know?',
      description:
        'Each emoji has its own story, and we have carefully designed the details page for each emoji, providing interpretations, use cases, and related information to help you better understand and use emojis.',
    },
  ]

export default function Page() {
    
    return (
        <main className="isolate">
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

        </div>
            <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About Us</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            Welcome to EmojiTell, where we are dedicated to providing colorful and fun experiences through AI technology. We believe that emojis have a unique and irreplaceable value in showcasing emotions, conveying information, and enhancing the fun of communication.
            </p>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {values.map((value) => (
              <div key={value.name}>
                <dt className="font-semibold text-gray-900">{value.name}</dt>
                <dd className="mt-1 text-gray-600">{value.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div
  className="absolute left-1/2 top-1/2 -z-10 hidden -translate-x-1/2 -translate-y-1/2 transform-gpu overflow-hidden blur-3xl sm:block"
  aria-hidden="true"
>
  <div
    className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
    style={{
      clipPath:
        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
    }}
  />
</div>
        </main>)
}