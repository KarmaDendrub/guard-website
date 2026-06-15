/** Services — SMS ГУАРД removed */

export type Service = {
  key: string;
  title: string;
  href: string;
  icon: string;
  description: string;
  image: string;
};

export const SERVICES: Service[] = [
  {
    key: "pult",
    title: "Пультова охорона об'єктів",
    href: "/pultova-oxorona",
    icon: "MonitorCheck",
    description:
      "Цілодобовий моніторинг вашого об'єкта на центральному пульті. При спрацюванні сигналізації — миттєве виїздне реагування мобільної групи. Під охороною 24 години на добу, 7 днів на тиждень.",
    image: "/images/services/pult.svg",
  },
  {
    key: "ajax",
    title: "Бездротова сигналізація AJAX",
    href: "/bezdrotova-signalizaciya",
    icon: "Wifi",
    description:
      "Сучасні бездротові охоронні системи AJAX — монтаж без штроблення стін, керування зі смартфона. Надійний захист квартири, будинку або офісу з миттєвим сповіщенням.",
    image: "/images/services/ajax.jpg",
  },
  {
    key: "provodna",
    title: "Провідна сигналізація",
    href: "/providna-signalizaciya",
    icon: "Cable",
    description:
      "Класичні провідні охоронні системи для об'єктів будь-якої складності. Висока надійність, стійкість до перешкод, підключення до пульту централізованого спостереження.",
    image: "/images/services/provodna.svg",
  },
  {
    key: "fizychna",
    title: "Фізична охорона об'єктів",
    href: "/fizychna-oxorona",
    icon: "UserCheck",
    description:
      "Професійні озброєні охоронці на вашому об'єкті. Контроль доступу, охорона периметра, супровід цінностей та VIP-осіб. Індивідуальний підхід до кожного клієнта.",
    image: "/images/services/fizychna.svg",
  },
  {
    key: "perimetr",
    title: "Периметральна сигналізація",
    href: "/perimetralna-signalizaciya",
    icon: "Fence",
    description:
      "Захист зовнішнього периметра з виявленням вторгнення ще до підходу до будівлі. Інфрачервоні, вібраційні та мікрохвильові датчики для будь-яких умов.",
    image: "/images/services/perimetr.svg",
  },
  {
    key: "skud",
    title: "Системи контролю доступу",
    href: "/sistemi-kontrolyu-dostupu",
    icon: "ScanLine",
    description:
      "СКУД для офісів, підприємств та житлових комплексів: картки, браслети, біометрія. Точний облік робочого часу та диференційоване управління правами доступу.",
    image: "/images/services/skud.svg",
  },
  {
    key: "vdoma",
    title: "Я вдома під охороною",
    href: "/ya-vdoma",
    icon: "Home",
    description:
      "Спеціальна послуга для захисту вдома: тривожна кнопка, датчики руху та негайний виклик мобільної групи. Безпека для вас і вашої родини цілодобово.",
    image: "/images/services/vdoma.svg",
  },
  {
    key: "klaviatura",
    title: "Мобільна клавіатура",
    href: "/mobilna-klaviatura",
    icon: "Smartphone",
    description:
      "Зручне управління охоронною системою через мобільний додаток. Постановка та зняття з охорони, перегляд подій та стану датчиків у реальному часі.",
    image: "/images/services/klaviatura.svg",
  },
  {
    key: "video",
    title: "Відеоспостереження",
    href: "/videoposterezhennaya",
    icon: "Cctv",
    description:
      "Монтаж та обслуговування IP та аналогових систем відеоспостереження. Віддалений перегляд онлайн, архів запису, розпізнавання осіб та автомобільних номерів.",
    image: "/images/services/video.svg",
  },
  {
    key: "pozhezhna",
    title: "Пожежна сигналізація",
    href: "/pozhezhna-signalizaciya",
    icon: "Flame",
    description:
      "Адресні та порогові системи пожежної сигналізації. Раннє виявлення диму та підвищення температури, автоматичне сповіщення служб та евакуація персоналу.",
    image: "/images/services/pozhezhna.svg",
  },
  {
    key: "grupy",
    title: "Мобільні групи реагування",
    href: "/mobilni-grupy",
    icon: "Car",
    description:
      "70 озброєних екіпажів по всьому Дніпру. Час прибуття — від 3 до 7 хвилин. Цілодобове патрулювання та миттєве реагування на тривогу будь-якого об'єкта.",
    image: "/images/services/grupy.svg",
  },
  {
    key: "satelit",
    title: "Супутникове спостереження",
    href: "/suputnikove-sposterezhennya",
    icon: "Satellite",
    description:
      "GPS/ГЛОНАСС моніторинг транспортних засобів та рухомих об'єктів. Контроль маршруту, швидкості та зупинок в режимі реального часу через веб-кабінет.",
    image: "/images/services/satelit.svg",
  },
  {
    key: "montazh",
    title: "Монтажні роботи",
    href: "/montazh",
    icon: "Wrench",
    description:
      "Проєктування, монтаж та налаштування всіх систем безпеки під ключ. Власна бригада сертифікованих монтажників. Гарантія на виконані роботи та обладнання.",
    image: "/images/services/montazh.jpg",
  },
];
