"use client";
import { responseAtom } from "@/lib/store";
import { useAtom } from "jotai";


export default function GPTResponse() {
    const [response] = useAtom(responseAtom);

    return (
        <div className="w-full justify-start mt-4">
            <label className="p-2 text-left font-medium flex align-center">
                <div dangerouslySetInnerHTML={{ __html: response ? response : "" }} />
            </label>
        </div>
    );
}