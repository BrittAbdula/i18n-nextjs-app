import React from "react";
import { useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations("Index.Footer");
    return (
        <footer className="text-center h-8 sm:h-16 w-full sm:pt-1 pt-2 border-t mt-2 flex sm:flex-row flex-col justify-between items-center px-3 space-y-3 sm:mb-0 mb-2">
            <div>
                { t('by') }
                <a
                    href="#"
                    rel="noreferrer"
                    className="font-bold hover:underline transition underline-offset-2"
                >
                    { t('author') }
                </a>
            </div>
            <div className="sm:text-right ">
                { t('description') }

            </div>
        </footer>
    );
}
