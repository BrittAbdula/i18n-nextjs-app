"use client";
import { responseAtom } from "@/lib/store";
import { useAtom } from "jotai";
import { useState } from "react";
import RoundFilledNumber from "@/components/roundFilledNumber/RoundFilledNumber";
import { useTranslations } from 'next-intl';
import LoadingDots from "@/components/loadingDots/LoadingDots";
import { Toaster, toast } from "react-hot-toast";
import GPTResponse from "./GPTResponse";
import { useLocale } from "next-intl";

export default function Form() {
  const locale = useLocale();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [_response, setResponse] = useAtom(responseAtom);
  const [combo, setCombo] = useState("");
  const t = useTranslations("Index");
  const reset = () => {
    setInput("");
    setIsLoading(false);
    setResponse("");
    setCombo("");
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    try {
      const res = await fetch(`/${locale}/api/convert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.ok) throw new Error(res.statusText);

      const data = res.body;
      if (!data) return;

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        const chunkValueWithNewLine = chunkValue.replace(/\|/g, '<br><br>');
        setResponse((prev) => prev + chunkValueWithNewLine);
        setCombo((prev) => prev + chunkValue);
      }
      setCombo((prev) => prev.split('|')[0]);
    } catch (error) {
      console.log("An error occurred while fetching data:", error);
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  return (
    <main className="isolate">
      {/* Hero section */}
      <div className="relative">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        {/* content */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                {t('emojiCombo')} <span style={{ color: '#9933FF' }}>{t('translator')}</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {t('slogan')}
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                e.g. Of course I still Love You &rarr; <span className=" text-xl font-bold md:text-2xl emoji-text">💖😊🔄💘</span>
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <div className="max-w-xl w-full">
                  <div className="flex mt-10 items-center space-x-3">
                    <RoundFilledNumber number={1} />
                    <p className="text-left font-medium flex align-center">
                      {t('step_1')} {" "}
                    </p>
                  </div>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={4}
                    className="p-2 w-full rounded-md border-gray-300 border-2 shadow-sm focus:border-black focus:ring-black my-5"
                    placeholder={t('exampleInput') || ''}
                  />
                  <div className="flex mt-2 items-center space-x-3">
                    <RoundFilledNumber number={2} />
                    <p className="text-left font-medium flex align-center">
                      {t('step_2')} {" "}
                    </p>
                  </div>

                  {!isLoading && (<>
                    <button
                      disabled={!input}
                      className="bg-indigo-600 hover:bg-indigo-600/80 rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8  w-full"
                      onClick={(e) => {
                        setCombo("");
                        setResponse("");
                        e.preventDefault();
                        handleSubmit();
                      }}>
                      {t('cta')}&rarr;
                    </button>

                    {combo && (
                    <>
                    <button
                      className="w-full justify-start mt-4"
                      onClick={(e) => {
                        e.preventDefault();
                        reset();
                      }}>
                      {t('reset')}
                    </button>
                    <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
                    <div className="max-w-xl w-full">
                    <div className="w-full justify-start mt-4">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(combo);
                          toast(
                            t('copyed_text'),
                            {
                              icon: "✂️",
                            }
                          );
                        }
                        }>
                        {t('copy_text')}
                      </button>
                    </div>
                  </div>
                    </>
                    )}
                  </>
                  )}
                  {isLoading && (
                    <button
                      className="p-2 bg-indigo-600 rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-indigo-600/80 w-full"
                      disabled
                    >
                      <LoadingDots color="white" style="large" />
                    </button>
                  )}

                  <GPTResponse />

                </div>
                

              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>


      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />


    </main>
  );
}