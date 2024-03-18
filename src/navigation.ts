import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'es'] as const;
// Use the default: `always`，设置为 as-needed可不显示默认路由
export const localePrefix = 'as-needed';

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });

  
export const languages = [
  {
    code: "en-US",
    lang: "en",
    language: "English",
  },
  {
    code: "es",
    lang: "es",
    language: "Español",
  }
]