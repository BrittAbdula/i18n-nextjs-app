'use client';

import { useRouter, usePathname } from '@/navigation';
import React from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { locales } from '@/navigation';
import { useTransition } from 'react';


export default function LanguageChanger() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('Index.Header.LanguageChanger');
  const [isPending, startTransition] = useTransition();

  const flagSrc = locale === 'en' ? '/images/us.png' : '/images/es.png';
  const flagAlt = locale === 'en' ? 'english' : 'Español';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(pathname, { locale: e.target.value });
  };

  return (
    <div className="relative mr-4">
      <select
        value={locale}
        onChange={handleChange}
        className="appearance-none bg-transparent border-none outline-none shadow-none focus-none pl-10 focus:outline-none "
        disabled={isPending}
      >
        {/* <option value="en">{t('EN')}</option> */}
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
      <div className="absolute inset-y-0 left-0 flex items-center pl-2">
        <Image src={flagSrc} alt={flagAlt} width={20} height={20} />
      </div>

    </div>
  );
}