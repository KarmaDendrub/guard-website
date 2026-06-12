/** The 14 services shown on the homepage grid and as dedicated pages. */

export type Service = {
  key: string;
  title: string;
  href: string;
  /** lucide-react icon name, mapped to a component in ServiceCard. */
  icon: string;
  description: string;
  /** Path under /public; real photo where available, branded SVG otherwise. */
  image: string;
};

export const SERVICES: Service[] = [
  {
    key: "pult",
    title: "Пультова охорона об'єктів",
    href: "/pultova-oxorona",
    icon: "MonitorCheck",
    description:
      "Цілодобовий моніторинг сигналів вашого об'єкта на пульті з миттєвим реагуванням мобільних груп.",
    image: "/images/services/pult.svg",
  },
  {
    key: "ajax",
    title: "Бездротова сигналізація AJAX",
    href: "/bezdrotova-signalizaciya",
    icon: "Wifi",
    description:
      "Сучасні бездротові системи безпеки AJAX — швидкий монтаж без штроблення стін та керування зі смартфона.",
    image: "/images/services/ajax.jpg",
  },
  {
    key: "provodna",
    title: "Дротова сигналізація",
    href: "/providna-signalizaciya",
    icon: "Cable",
    description:
      "Надійні провідні охоронні системи для об'єктів будь-якої складності та площі.",
    image: "/images/services/provodna.svg",
  },
  {
    key: "fizychna",
    title: "Фізична охорона об'єктів",
    href: "/fizychna-oxorona",
    icon: "UserCheck",
    description:
      "Професійні охоронці на вашому об'єкті — контроль доступу, порядок та оперативне реагування.",
    image: "/images/services/fizychna.svg",
  },
  {
    key: "perimetr",
    title: "Периметральна сигналізація",
    href: "/perimetralna-signalizaciya",
    icon: "Fence",
    description:
      "Захист периметра території з раннім виявленням проникнення ще до підходу до будівлі.",
    image: "/images/services/perimetr.svg",
  },
  {
    key: "skud",
    title: "Системи контролю доступу",
    href: "/sistemi-kontrolyu-dostupu",
    icon: "ScanLine",
    description:
      "СКУД для офісів та підприємств: картки, біометрія, облік робочого часу та керування доступом.",
    image: "/images/services/skud.svg",
  },
  {
    key: "vdoma",
    title: "Я дома під охороною",
    href: "/ya-vdoma",
    icon: "Home",
    description:
      "Особлива послуга для тих, хто вдома: тривожна кнопка та виклик мобільної групи у разі небезпеки.",
    image: "/images/services/vdoma.svg",
  },
  {
    key: "klaviatura",
    title: "Мобільна клавіатура",
    href: "/mobilna-klaviatura",
    icon: "Smartphone",
    description:
      "Керуйте охоронною системою зі смартфона — постановка та зняття з охорони у кілька дотиків.",
    image: "/images/services/klaviatura.svg",
  },
  {
    key: "video",
    title: "Відеоспостереження",
    href: "/videoposterezhennaya",
    icon: "Cctv",
    description:
      "Монтаж та обслуговування систем відеоспостереження з віддаленим доступом і архівом запису.",
    image: "/images/services/video.svg",
  },
  {
    key: "pozhezhna",
    title: "Пожежна сигналізація",
    href: "/pozhezhna-signalizaciya",
    icon: "Flame",
    description:
      "Раннє виявлення займання та автоматичне сповіщення — захист людей і майна від пожежі.",
    image: "/images/services/pozhezhna.svg",
  },
  {
    key: "grupy",
    title: "Мобільні групи",
    href: "/mobilni-grupy",
    icon: "Car",
    description:
      "70 екіпажів реагування по всьому Дніпру, готових прибути на об'єкт у будь-який час доби.",
    image: "/images/services/grupy.svg",
  },
  {
    key: "sms",
    title: "SMS ГУАРД",
    href: "/sms-guard",
    icon: "MessageSquare",
    description:
      "Інформування про всі події на об'єкті через SMS — ви завжди в курсі стану вашої охорони.",
    image: "/images/services/sms.svg",
  },
  {
    key: "satelit",
    title: "Супутникове спостереження",
    href: "/suputnikove-sposterezhennya",
    icon: "Satellite",
    description:
      "GPS-моніторинг транспорту та мобільних об'єктів з контролем маршруту в реальному часі.",
    image: "/images/services/satelit.svg",
  },
  {
    key: "montazh",
    title: "Монтажні роботи",
    href: "/montazh",
    icon: "Wrench",
    description:
      "Професійний монтаж і налаштування всіх систем безпеки під ключ кваліфікованими фахівцями.",
    image: "/images/services/montazh.jpg",
  },
];
