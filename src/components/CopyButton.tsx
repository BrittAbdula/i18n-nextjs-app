'use client'
import { Toaster, toast } from "react-hot-toast";

const CopyButton = ( {text}: {text: string | null}) => {
    const copyText = text || "";
    return (
        <>
            <button className="inline-flex items-center px-4 py-2 mt-4 font-semibold text-white bg-indigo-600 hover:bg-indigo-600/80 rounded-md shadow-md  focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                onClick={() => {
                    navigator.clipboard.writeText(copyText);
                    toast("copied to clipboard",
                        {
                            icon: "✂️",
                        }
                    );
                }
                }>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                Copy

            </button>
            <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{ duration: 2000 }}
            />
        </>
    )
}

export default CopyButton;