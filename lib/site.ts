/** Central site configuration: contacts, navigation, socials. */

export const COMPANY = {
  name: "Корпорація «ГУАРД»",
  shortName: "ГУАРД",
  slogan: "Надійна охорона в Дніпрі",
  city: "м. Дніпро, Україна",
  legacyUrl: "https://guard.ua",
  paymentUrl:
    'https://next.privat24.ua/payments/form/{"token":"e48c509c-980e-4b2c-8941-d2e1b8512dab"}',
} as const;

/** Phone numbers — `display` for UI, `tel` for href. */
export const PHONES = [
  { display: "+38 (056) 766-07-17", tel: "+380567660717" },
  { display: "+38 (067) 632-19-91", tel: "+380676321991" },
  { display: "+38 (066) 235-74-19", tel: "+380662357419" },
  { display: "+38 (093) 750-27-84", tel: "+380937502784" },
] as const;

/** Primary header navigation, in the order the legacy site used. */
export const NAV_LINKS = [
  { label: "Акції", href: "/akcii" },
  { label: "Головна", href: "/" },
  { label: "Пропозиції", href: "/propoziciya" },
  { label: "Пультова охорона", href: "/pultova-oxorona" },
  { label: "Мобільні групи", href: "/mobilni-grupy" },
  { label: "Контакти", href: "/kontakti" },
  { label: "Вакансії", href: "/vakansii" },
  { label: "Відгуки", href: "/#reviews" },
] as const;

export const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/guard.ua/", icon: "instagram" },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61566289478791",
    icon: "facebook",
  },
  { name: "Google Maps", href: "https://goo.gl/maps/pBTZmMgtrvTHkua3A", icon: "map-pin" },
  { name: "Telegram", href: "https://t.me/guardua", icon: "telegram" },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UC-rCFL1IrBa3j3_mJX_gyzQ/",
    icon: "youtube",
  },
  {
    name: "Viber",
    href: "https://invite.viber.com/?g2=AQADikSkxTmED0yTV8DfmzYaNXZqN728tIrFwLCbzkwJj5sMTHBKqcoMMPt7orVF",
    icon: "viber",
  },
] as const;

/** Headline statistics (counter section). */
export const STATS = [
  { value: 70, suffix: "", label: "мобільних груп" },
  { value: 25, suffix: "+", label: "років на ринку" },
  { value: 5000, suffix: "+", label: "об'єктів під охороною" },
  { value: 24, suffix: "/7", label: "реагування" },
] as const;
