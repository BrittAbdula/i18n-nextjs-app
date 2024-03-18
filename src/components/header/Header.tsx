import Link from "next/link";
import LanguageChanger from "../languageChanger/LanguageChanger";
import { useTranslations } from "next-intl";

export default function Header() {
    const t = useTranslations('Index.Header');
    const tl = useTranslations('Index.Links');
    return (
        <header className="flex justify-between items-center w-full mt-2 border-b pb-3 sm:px-4 px-2">
            <Link href="/" className="flex space-x-3">
                <h1 className="sm:text-2xl text-1xl font-normal ml-2 tracking-tight">
                    { t('h1_suf') } <span style={{color: '#1A6292'}}>{t('h1_pre')}  </span>
                </h1>
            </Link>
            <div className="flex flex-row">
                {/* 添加的新导航项 */}
                <Link href="/discovery">
                    <h1 className="sm:text-lg text-base font-normal tracking-tight" style={{color: '#1A6292'}}>
                        {tl('discovery')}
                    </h1>
                </Link>
                <span className="mx-2">|</span>
                <Link href="/about">
                    <h1 className="sm:text-lg text-base font-normal tracking-tight" style={{color: '#1A6292'}}>
                        {tl('about')}
                    </h1>
                </Link>
                <span className="mx-2">|</span>
                <LanguageChanger />
            </div>
    </header>
    );
}