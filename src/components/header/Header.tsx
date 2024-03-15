import Link from "next/link";
import LanguageChanger from "../languageChanger/LanguageChanger";
import { useTranslations } from "next-intl";

export default function Header() {
    const t = useTranslations('Index.Header');
    return (
        <header className="flex justify-between items-center w-full mt-2 border-b pb-3 sm:px-4 px-2">
            <Link href="/" className="flex space-x-3">
                <h1 className="sm:text-2xl text-1xl font-normal ml-2 tracking-tight">
                    { t('h1_suf') } <span style={{color: '#1A6292'}}>{t('h1_pre')}  </span>
                </h1>
            </Link>
            <div className="flex flex-row">
                <LanguageChanger />
            </div>
    </header>
    );
}