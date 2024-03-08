# i18n-nextjs-app
An guide for i18n with Next.js 13/14 and app directory / App Router

## Getting Started

1. create a next.js app

```bash
npx  create-next-app@latest
```
2. install next-intl
```bash
npm install next-intl
```

3. make the src directory

└── messages

    ├── en.json

    ├── de.json

    └── ...json

└── src

    └── app

        └── [locale]

            ├── layout.js

            └── page.js

    └── componets

        └── LanguageChanger.tsx
        
    └── i18n.ts

    ├── middleware.ts

    └── navigation.ts

└── next.config.js

4. Follow the official tutorial to implement the function outlined below:
- Set up localized URLs using dynamic routing
- Configure locale detection and redirection in middleware.ts
- Organize your key-value JSON files in the messages directory
- In i18n.ts, establish supported locales and the file paths to the corresponding JSON files
- navigation.ts should handle the automatic detection of the language environment, including fetching the Accept-Language header, and setting the locale cookie appropriately
- Utilize <html lang={locale}>, the useTranslations() hook, and a language switcher in your UI for seamless language toggling

## refference

To learn more about Next.js, take a look at the following resources:

- [next-intl](https://next-intl-docs.vercel.app/docs/getting-started) - learn about next-intl.
- [i18n with Next.js 13/14 and app directory / App Router (an i18next guide)](https://locize.com/blog/next-app-dir-i18n/) - an guide for Next.js 13/14 and /app router.
- [Next.js App Router with next-intl (Tutorial)](https://i18nexus.com/tutorials/nextjs/next-intl) - A complete guide for setting up next-intl with the App Router

