import Link from "next/link";
import {useTranslations} from 'next-intl';


export default function Home() {
  const t = useTranslations('Index');
  const userName = 'David';
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <h1>Welcome to my app, {t('title')}!</h1>
    <div>
      <Link href="/client-page">client-page</Link>
    </div>
    <div>
      <Link href="/server-page">server-page</Link>
    </div>
    </main>
  );
}
