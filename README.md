This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Контент через Sanity CMS

Тексти та фото сайту редагуються через вбудовану адмін-панель **Sanity Studio**.

- **Адмінка:** відкрийте `/studio` (локально — http://localhost:3000/studio,
  на проді — https://<домен>/studio). Увійдіть тим самим обліковим записом Sanity.
- **Що редагується:** логотип, телефони, соцмережі (Налаштування сайту),
  головний банер, блок «Про компанію», статистика, послуги (UA/RU), галерея,
  контакти. UI-рядки (кнопки, меню) лишаються у `messages/*.json` (next-intl).
- **Як це працює:** компоненти тягнуть контент через GROQ (`sanity/lib`). Якщо
  Sanity недоступний або поле порожнє — показується вбудований запасний контент,
  тож сайт ніколи не «ламається».
- **Зміни** з'являються на сайті протягом ~1 хв (ISR, `revalidate: 60`).

### Налаштування оточення

Скопіюйте `.env.example` → `.env.local` і впишіть токен:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=t1v1zdls
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=<editor-token>   # лише для міграції; не комітити
```

На Vercel ці ж змінні додайте в **Project → Settings → Environment Variables**.
Публічні `NEXT_PUBLIC_*` обов'язкові для збірки; `SANITY_API_TOKEN` потрібен лише
для скрипта міграції.

### Повторний імпорт контенту з коду (одноразово)

```bash
node --env-file=.env.local scripts/migrate-to-sanity.mjs
```

Скрипт ідемпотентний: фіксовані `_id` + `createOrReplace`, повторні фото не
завантажуються.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
