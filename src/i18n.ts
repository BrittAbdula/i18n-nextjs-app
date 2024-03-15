import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import { locales } from './navigation';
 
// Can be imported from a shared config
// const locales = ['en', 'es'];
 
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  const baseLocale = new Intl.Locale(locale).baseName;
  if (!locales.includes(locale as any)) notFound();
 
  return {
    messages: (await import(`../messages/${baseLocale}.json`)).default
  };
});