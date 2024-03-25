"use client";
import { responseAtom } from "@/lib/store";
import { useAtom } from "jotai";
import { useState } from "react";
import RoundFilledNumber from "@/components/roundFilledNumber/RoundFilledNumber";
import { useTranslations } from 'next-intl';
import LoadingDots from "@/components/loadingDots/LoadingDots";
import { Toaster, toast } from "react-hot-toast";
import GPTResponse from "../GPTResponse";
import { useLocale } from "next-intl";


export default function Form() {
  const locale = useLocale();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [_response, setResponse] = useAtom(responseAtom);
  const t = useTranslations("Index");

  const handleSubmit = async () => {
    setIsLoading(true);

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
      // covert '|' to '\n\n'
      const chunkValueWithNewLine = chunkValue.replace(/\|/g, '\n\n');
      setResponse((prev) => prev + chunkValueWithNewLine);
    }

    setIsLoading(false);
  };

  return (
    <main className="flex flex-1 w-full flex-col items-center text-center px-4 mt-12 sm:mt-10">
      <h1 className="sm:text-3xl text-2xl max-w-1xl font-normal text-slate-900">
        {t('emojiCombo')} <span style={{ color: '#1A6292' }}>{t('translator')}</span>
      </h1>

      <h2 className="sm:text-xl text-xl max-w-1xl font-light text-gray-600  sm:mt-2">
        {t('slogan')}
      </h2>

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
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={ (e) => {
                setResponse("");
                e.preventDefault();
                handleSubmit();
              }}
            >
              {t('cta')}&rarr;
            </button>
            <button
              className="w-full justify-start mt-4"
              onClick={(e) => {
                e.preventDefault();
                setInput("");
                setResponse("");
            }}>
              {t('reset')}
            </button>
          </>
          )}
          {isLoading && (
            <button
              className="p-2 bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}

        <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{ duration: 2000 }}
            />
            <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />

            <div className="max-w-xl w-full">
                <div className="w-full justify-start mt-4">
                    <button 
                        onClick={() => 
                            {
                                navigator.clipboard.writeText(_response);
                            toast(
                                t('copyed_text'),
                                {
                                    icon: "✂️",
                                }
                            );}
                        }>
                       { t('copy_text')}
                    </button>
                </div>
            </div>

            <GPTResponse /> 

      </div>
    </main>
  );
}