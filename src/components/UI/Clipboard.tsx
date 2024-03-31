'use client';
import { Toaster, toast } from "react-hot-toast";

export default function Clipboard({ copyText }: { copyText: string | null}) {
    return (
    <>
    <button className="bg-[#f2f2f7] p-2 rounded-md font-semibold"
        onClick={() => {
            if (copyText) {
                navigator.clipboard.writeText(copyText);
            }
            toast(
                "Copied successfully",
                {
                    icon: "✂️",
                }
            );
        }
        }>Copy</button>

        <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
      </>
)}
