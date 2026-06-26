import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";

const sans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

const heading = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-heading",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://guard.ua"),
  title: {
    default: "Корпорація «ГУАРД» — надійна охорона в Дніпрі",
    template: "%s | Корпорація «ГУАРД»",
  },
  description:
    "Охоронна Корпорація «ГУАРД» (Дніпро): пультова та фізична охорона, сигналізація AJAX, відеоспостереження, 70 мобільних груп, реагування 24/7.",
  keywords: [
    "охорона Дніпро",
    "пультова охорона",
    "сигналізація AJAX",
    "відеоспостереження",
    "мобільні групи",
    "ГУАРД",
  ],
  openGraph: {
    title: "Корпорація «ГУАРД» — надійна охорона в Дніпрі",
    description: "70 мобільних груп • 24/7 • Весь спектр послуг безпеки",
    type: "website",
    locale: "uk_UA",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D1A35",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${sans.variable} ${heading.variable} font-sans antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
