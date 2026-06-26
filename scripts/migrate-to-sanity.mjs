/**
 * One-off migration: pushes ALL current site content (texts from messages/*.json
 * + lib/site.ts + lib/services.ts, and photos from public/images) into Sanity.
 *
 * Run from the project root:
 *   node --env-file=.env.local scripts/migrate-to-sanity.mjs
 *
 * Idempotent: uses fixed document _ids + createOrReplace, and skips re-uploading
 * an image asset that is already present (matched by original filename).
 */
import { createClient } from "@sanity/client";
import { createReadStream, existsSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PUB = join(ROOT, "public");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing env. Need NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ---- image upload (with reuse) -------------------------------------------

const assetCache = new Map(); // filename -> assetId
let existingAssets = null;

async function loadExistingAssets() {
  if (existingAssets) return existingAssets;
  const rows = await client.fetch(
    `*[_type == "sanity.imageAsset"]{ _id, originalFilename }`
  );
  existingAssets = new Map();
  for (const r of rows) {
    if (r.originalFilename) existingAssets.set(r.originalFilename, r._id);
  }
  return existingAssets;
}

/** Upload a /public-relative image and return a Sanity image reference object. */
async function image(relPath) {
  if (relPath == null) return undefined;
  const filename = basename(relPath);
  const abs = join(PUB, relPath.replace(/^\//, ""));
  if (!existsSync(abs)) {
    console.warn(`  ! missing image, skipping: ${relPath}`);
    return undefined;
  }
  let assetId = assetCache.get(filename);
  if (!assetId) {
    const existing = await loadExistingAssets();
    assetId = existing.get(filename);
  }
  if (!assetId) {
    process.stdout.write(`  ↑ uploading ${filename} ... `);
    const asset = await client.assets.upload("image", createReadStream(abs), {
      filename,
    });
    assetId = asset._id;
    console.log("done");
  }
  assetCache.set(filename, assetId);
  return { _type: "image", asset: { _type: "reference", _ref: assetId } };
}

const L = (uk, ru) => ({ _type: "localeString", uk, ru: ru ?? uk });
const T = (uk, ru) => ({ _type: "localeText", uk, ru: ru ?? uk });
const key = (i) => `k${i}`;

// ---- content data ---------------------------------------------------------

const PHONES = [
  { display: "+38 (056) 766-07-17", tel: "+380567660717" },
  { display: "+38 (067) 632-19-91", tel: "+380676321991" },
  { display: "+38 (066) 235-74-19", tel: "+380662357419" },
  { display: "+38 (093) 750-27-84", tel: "+380937502784" },
];

const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/guard.ua/", icon: "instagram" },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61566289478791", icon: "facebook" },
  { name: "Google Maps", href: "https://goo.gl/maps/pBTZmMgtrvTHkua3A", icon: "map-pin" },
  { name: "Telegram", href: "https://t.me/guardua", icon: "telegram" },
  { name: "YouTube", href: "https://www.youtube.com/channel/UC-rCFL1IrBa3j3_mJX_gyzQ/", icon: "youtube" },
  { name: "Viber", href: "https://invite.viber.com/?g2=AQADikSkxTmED0yTV8DfmzYaNXZqN728tIrFwLCbzkwJj5sMTHBKqcoMMPt7orVF", icon: "viber" },
];

// Stat labels come straight from messages/*.json
const STATS = [
  { id: "groups", value: 70, suffix: "", icon: "Car", label: L("мобільних груп", "мобильных групп") },
  { id: "years", value: 20, suffix: "+", icon: "Award", label: L("років на ринку", "лет на рынке") },
  { id: "objects", value: 20000, suffix: "+", icon: "Building2", label: L("об'єктів під охороною", "объектов под охраной") },
  { id: "react", value: 24, suffix: "/7", icon: "Clock", label: L("реагування", "реагирование") },
];

// Services: UA from lib/services.ts, RU translated for this migration.
const SERVICES = [
  { id: "pult", inGrid: true, icon: "MonitorCheck", slug: "pultova-oxorona", img: "/images/services/pult.jpg",
    title: L("Пультова охорона", "Пультовая охрана"),
    desc: T(
      "Охоронна сигналізація з виведенням на пульт централізованого спостереження «ГУАРД». При спрацюванні диспетчер миттєво отримує сигнал «Тривога» та направляє найближчу з 70 мобільних груп. Надійний та економічно вигідний захист житлової й комерційної нерухомості.",
      "Охранная сигнализация с выводом на пульт централизованного наблюдения «ГУАРД». При срабатывании диспетчер мгновенно получает сигнал «Тревога» и направляет ближайшую из 70 мобильных групп. Надёжная и экономически выгодная защита жилой и коммерческой недвижимости."
    ) },
  { id: "fizychna", inGrid: true, icon: "UserCheck", slug: "fizychna-oxorona", img: "/images/services/fizychna.jpg",
    title: L("Фізична охорона об'єктів", "Физическая охрана объектов"),
    desc: T(
      "Надійний захист бізнесу, майна, співробітників та відвідувачів завдяки постійній присутності професійних охоронців на об'єкті. Контроль пропускного режиму, патрулювання, охорона території та матеріальних цінностей. Комплексна безпека підприємств, офісів, складів, ТЦ та об'єктів будь-якої форми власності.",
      "Надёжная защита бизнеса, имущества, сотрудников и посетителей благодаря постоянному присутствию профессиональных охранников на объекте. Контроль пропускного режима, патрулирование, охрана территории и материальных ценностей. Комплексная безопасность предприятий, офисов, складов, ТЦ и объектов любой формы собственности."
    ) },
  { id: "provodna", inGrid: true, icon: "Cable", slug: "providna-signalizaciya", img: "/images/services/provodna.jpg",
    title: L("Дротова охоронна сигналізація", "Проводная охранная сигнализация"),
    desc: T(
      "Надійний та перевірений спосіб захисту квартири, будинку, офісу, магазину чи складу від несанкціонованого проникнення. Система цілодобово контролює об'єкт і миттєво передає сигнал тривоги на пульт «ГУАРД». У разі загрози на місце негайно направляється найближча мобільна група реагування.",
      "Надёжный и проверенный способ защиты квартиры, дома, офиса, магазина или склада от несанкционированного проникновения. Система круглосуточно контролирует объект и мгновенно передаёт сигнал тревоги на пульт «ГУАРД». В случае угрозы на место немедленно направляется ближайшая мобильная группа реагирования."
    ) },
  { id: "ajax", inGrid: true, icon: "Wifi", slug: "bezdrotova-signalizaciya", img: "/images/services/ajax.jpg",
    title: L("Бездротова сигналізація AJAX", "Беспроводная сигнализация AJAX"),
    desc: T(
      "AJAX — сучасна бездротова система безпеки європейського рівня, що захищає від проникнення, пожежі, задимлення та затоплення. Швидкий монтаж без прокладання кабелів, керування зі смартфона й миттєві сповіщення. З підключенням до пульта «ГУАРД» — повноцінна професійна охорона з цілодобовим моніторингом.",
      "AJAX — современная беспроводная система безопасности европейского уровня, защищающая от проникновения, пожара, задымления и затопления. Быстрый монтаж без прокладки кабелей, управление со смартфона и мгновенные уведомления. С подключением к пульту «ГУАРД» — полноценная профессиональная охрана с круглосуточным мониторингом."
    ) },
  { id: "jablotron", inGrid: true, icon: "Radio", slug: "bezdrotova-signalizaciya-jablotron", img: "/images/services/jablotron.jpg",
    title: L("Бездротова сигналізація JABLOTRON", "Беспроводная сигнализация JABLOTRON"),
    desc: T(
      "Надійні бездротові охоронні комплекси JABLOTRON чеського виробництва. Гнучке налаштування зон, зручне керування та стабільний радіозв'язок із підключенням на пульт централізованого спостереження.",
      "Надёжные беспроводные охранные комплексы JABLOTRON чешского производства. Гибкая настройка зон, удобное управление и стабильная радиосвязь с подключением на пульт централизованного наблюдения."
    ) },
  { id: "klaviatura", inGrid: true, icon: "Smartphone", slug: "mobilna-klaviatura", img: "/images/services/klaviatura.jpg",
    title: L("Послуга «Мобільна клавіатура»", "Услуга «Мобильная клавиатура»"),
    desc: T(
      "Керуйте охоронною системою «ГУАРД» зі смартфона з будь-якої точки світу. Ставте об'єкт під охорону та знімайте дистанційно, контролюйте стан системи й переглядайте історію подій. Миттєві push-сповіщення про тривоги, відкриття та закриття тримають вас на зв'язку з об'єктом.",
      "Управляйте охранной системой «ГУАРД» со смартфона из любой точки мира. Ставьте объект под охрану и снимайте дистанционно, контролируйте состояние системы и просматривайте историю событий. Мгновенные push-уведомления о тревогах, открытии и закрытии держат вас на связи с объектом."
    ) },
  { id: "sms", inGrid: true, icon: "MessageSquare", slug: "sms-guard", img: "/images/services/sms.jpg",
    title: L("SMS-ГУАРД", "SMS-ГУАРД"),
    desc: T(
      "Інформування про всі події на об'єкті через SMS-повідомлення. Ви миттєво дізнаєтесь про постановку та зняття з охорони, тривоги й технічні події — контроль ситуації завжди під рукою.",
      "Информирование обо всех событиях на объекте через SMS-сообщения. Вы мгновенно узнаёте о постановке и снятии с охраны, тревогах и технических событиях — контроль ситуации всегда под рукой."
    ) },
  { id: "pozhezhna", inGrid: true, icon: "Flame", slug: "pozhezhna-signalizaciya", img: "/images/services/pozhezhna.jpg",
    title: L("Пожежна сигналізація", "Пожарная сигнализация"),
    desc: T(
      "Повний комплекс робіт із проєктування, монтажу та обслуговування систем пожежної сигналізації відповідно до законодавства України. Система цілодобово контролює об'єкт і реагує на появу диму чи підвищення температури на початковій стадії. Своєчасне сповіщення допомагає організувати евакуацію та мінімізувати наслідки пожежі.",
      "Полный комплекс работ по проектированию, монтажу и обслуживанию систем пожарной сигнализации в соответствии с законодательством Украины. Система круглосуточно контролирует объект и реагирует на появление дыма или повышение температуры на начальной стадии. Своевременное оповещение помогает организовать эвакуацию и минимизировать последствия пожара."
    ) },
  { id: "video", inGrid: true, icon: "Cctv", slug: "videoposterezhennaya", img: "/images/services/video.jpg",
    title: L("Відеоспостереження", "Видеонаблюдение"),
    desc: T(
      "Постійний контроль вашого будинку, офісу, магазину чи підприємства в режимі реального часу. Переглядайте відео онлайн зі смартфона, планшета або комп'ютера з будь-якої точки світу. Комплексні рішення — від однієї камери до багатоканальних систем із архівом запису.",
      "Постоянный контроль вашего дома, офиса, магазина или предприятия в режиме реального времени. Просматривайте видео онлайн со смартфона, планшета или компьютера из любой точки мира. Комплексные решения — от одной камеры до многоканальных систем с архивом записи."
    ) },
  { id: "satelit", inGrid: true, icon: "Satellite", slug: "suputnikove-sposterezhennya", img: "/images/services/satelit.jpg",
    title: L("Супутникове спостереження", "Спутниковое наблюдение"),
    desc: T(
      "Супутниковий GPS-моніторинг транспорту, вантажів і мобільного персоналу 24 години на добу. Відстежуйте рух, контролюйте маршрути та швидкість, аналізуйте роботу автопарку в реальному часі. Усі дані доступні через зручний веб-інтерфейс або мобільний застосунок.",
      "Спутниковый GPS-мониторинг транспорта, грузов и мобильного персонала 24 часа в сутки. Отслеживайте движение, контролируйте маршруты и скорость, анализируйте работу автопарка в реальном времени. Все данные доступны через удобный веб-интерфейс или мобильное приложение."
    ) },
  { id: "skud", inGrid: true, icon: "ScanLine", slug: "sistemi-kontrolyu-dostupu", img: "/images/services/skud.jpg",
    title: L("Системи контролю доступу", "Системы контроля доступа"),
    desc: T(
      "СКУД автоматизує пропускний режим та контролює переміщення людей і транспорту на об'єкті. Гнучке налаштування прав доступу, автоматичний облік робочого часу й повна історія подій у реальному часі. Замість паперових журналів і ключів — точний контроль та прозорість усіх подій.",
      "СКУД автоматизирует пропускной режим и контролирует перемещение людей и транспорта на объекте. Гибкая настройка прав доступа, автоматический учёт рабочего времени и полная история событий в реальном времени. Вместо бумажных журналов и ключей — точный контроль и прозрачность всех событий."
    ) },
  { id: "perimetr", inGrid: true, icon: "Fence", slug: "perimetralna-signalizaciya", img: "/images/services/perimetr.jpg",
    title: L("Периметральна сигналізація", "Периметральная сигнализация"),
    desc: T(
      "Перший рубіж безпеки, що виявляє порушника ще на підступах до території. Спеціальні датчики контролюють межі об'єкта й миттєво передають сигнал тривоги на пульт «ГУАРД». Захист огорож, в'їздів, складських майданчиків та прибудинкових ділянок цілодобово.",
      "Первый рубеж безопасности, обнаруживающий нарушителя ещё на подступах к территории. Специальные датчики контролируют границы объекта и мгновенно передают сигнал тревоги на пульт «ГУАРД». Защита ограждений, въездов, складских площадок и придомовых участков круглосуточно."
    ) },
  { id: "domofony", inGrid: true, icon: "Bell", slug: "domofony", img: "/images/services/domofony.jpg",
    title: L("Бездротові та дротові ДОМОФОНИ", "Беспроводные и проводные ДОМОФОНЫ"),
    desc: T(
      "Монтаж та обслуговування дротових і бездротових домофонних систем для квартир, приватних будинків і під'їздів. Зручний контроль входу, аудіо- та відеозв'язок з відвідувачами.",
      "Монтаж и обслуживание проводных и беспроводных домофонных систем для квартир, частных домов и подъездов. Удобный контроль входа, аудио- и видеосвязь с посетителями."
    ) },
  // --- outside the grid (own detail pages) ---
  { id: "grupy", inGrid: false, icon: "Car", slug: "mobilni-grupy", img: "/images/services/grupy.svg",
    title: L("Мобільні групи реагування", "Мобильные группы реагирования"),
    desc: T(
      "70 озброєних екіпажів по всьому Дніпру. Час прибуття — від 3 до 7 хвилин. Цілодобове патрулювання та миттєве реагування на тривогу будь-якого об'єкта.",
      "70 вооружённых экипажей по всему Днепру. Время прибытия — от 3 до 7 минут. Круглосуточное патрулирование и мгновенное реагирование на тревогу любого объекта."
    ) },
  { id: "vdoma", inGrid: false, icon: "Home", slug: "ya-vdoma", img: "/images/services/vdoma.svg",
    title: L("Я вдома під охороною", "Я дома под охраной"),
    desc: T(
      "Спеціальна послуга для захисту вдома: тривожна кнопка, датчики руху та негайний виклик мобільної групи. Безпека для вас і вашої родини цілодобово.",
      "Специальная услуга для защиты дома: тревожная кнопка, датчики движения и немедленный вызов мобильной группы. Безопасность для вас и вашей семьи круглосуточно."
    ) },
  { id: "montazh", inGrid: false, icon: "Wrench", slug: "montazh", img: "/images/services/montazh.jpg",
    title: L("Монтажні роботи", "Монтажные работы"),
    desc: T(
      "Проєктування, монтаж та налаштування всіх систем безпеки під ключ. Власна бригада сертифікованих монтажників. Гарантія на виконані роботи та обладнання.",
      "Проектирование, монтаж и настройка всех систем безопасности под ключ. Собственная бригада сертифицированных монтажников. Гарантия на выполненные работы и оборудование."
    ) },
];

// A starter gallery (staff can extend it in the Studio).
const GALLERY = [
  { id: "team", category: "guard", img: "/images/about/team.jpg", title: L("Команда «ГУАРД»", "Команда «ГУАРД»") },
  { id: "main", category: "guard", img: "/images/about/main.jpg", title: L("Мобільна група", "Мобильная группа") },
  { id: "obj1", category: "objects", img: "/images/news/magazyn-kradizhka.jpg", title: L("Охорона торгових об'єктів", "Охрана торговых объектов") },
  { id: "obj2", category: "objects", img: "/images/news/pryvatnyy-budynok.jpg", title: L("Охорона приватних будинків", "Охрана частных домов") },
];

// ---- build & upsert --------------------------------------------------------

async function run() {
  console.log(`\nMigrating content → project ${projectId}, dataset ${dataset}\n`);
  const docs = [];

  console.log("• siteSettings");
  docs.push({
    _id: "siteSettings",
    _type: "siteSettings",
    logo: await image("/images/logo.png"),
    companyName: L("Корпорація «ГУАРД»", "Корпорация «ГУАРД»"),
    slogan: L("Надійна охорона в Дніпрі", "Надёжная охрана в Днепре"),
    phones: PHONES.map((p, i) => ({ _key: key(i), ...p })),
    socials: SOCIALS.map((s, i) => ({ _key: key(i), ...s })),
    paymentUrl:
      'https://next.privat24.ua/payments/form/{"token":"e48c509c-980e-4b2c-8941-d2e1b8512dab"}',
    legacyUrl: "https://guard.ua",
  });

  console.log("• heroSection");
  const slides = [];
  for (const [i, p] of ["/images/hero/hero1.jpg", "/images/hero/hero2.jpg", "/images/hero/hero3.jpg"].entries()) {
    const img = await image(p);
    if (img) slides.push({ ...img, _key: key(i) });
  }
  docs.push({
    _id: "heroSection",
    _type: "heroSection",
    title: L(
      "Корпорація «ГУАРД» — надійна охорона в Дніпрі",
      "Корпорация ГУАРД — надёжная охрана в Днепре"
    ),
    subtitle: L(
      "70 мобільних груп • 24/7 • Весь спектр послуг безпеки",
      "70 мобильных групп • 24/7 • Весь спектр услуг безопасности"
    ),
    slides,
  });

  console.log("• aboutSection");
  docs.push({
    _id: "aboutSection",
    _type: "aboutSection",
    title: L("Про Корпорацію «ГУАРД»", "О Корпорации «ГУАРД»"),
    text: T(
      "Шановні Дніпровці! Щоб захистити вас від злочинців, Корпорація «ГУАРД» збільшила свій ресурс до 70 мобільних груп з професійними охоронниками, які в будь-який час доби готові негайно прибути в усі райони нашого міста і припинити будь-які злочинні наміри проти вас і вашої нерухомості.",
      "Уважаемые днепряне! Чтобы защитить вас от преступников, Корпорация «ГУАРД» увеличила свой ресурс до 70 мобильных групп с профессиональными охранниками, которые в любое время суток готовы немедленно прибыть во все районы нашего города и пресечь любые преступные намерения против вас и вашей недвижимости."
    ),
    image: await image("/images/about/main.jpg"),
  });

  console.log("• contactInfo");
  docs.push({
    _id: "contactInfo",
    _type: "contactInfo",
    address: L("м. Дніпро, Україна", "г. Днепр, Украина"),
    phone: PHONES[0],
    telegram: "https://t.me/guardua",
    mapUrl: "https://goo.gl/maps/pBTZmMgtrvTHkua3A",
    workingHours: L("Цілодобово, 24/7", "Круглосуточно, 24/7"),
  });

  console.log("• statistics");
  STATS.forEach((s, i) =>
    docs.push({
      _id: `statistic-${s.id}`,
      _type: "statistic",
      value: s.value,
      suffix: s.suffix,
      icon: s.icon,
      label: s.label,
      order: i,
    })
  );

  console.log("• services");
  let order = 0;
  for (const s of SERVICES) {
    docs.push({
      _id: `service-${s.id}`,
      _type: "service",
      title: s.title,
      slug: { _type: "slug", current: s.slug },
      description: s.desc,
      icon: s.icon,
      image: await image(s.img),
      inGrid: s.inGrid,
      order: order++,
    });
  }

  console.log("• gallery");
  let g = 0;
  for (const item of GALLERY) {
    docs.push({
      _id: `gallery-${item.id}`,
      _type: "photoGallery",
      title: item.title,
      category: item.category,
      image: await image(item.img),
      order: g++,
    });
  }

  console.log(`\nUpserting ${docs.length} documents ...`);
  let tx = client.transaction();
  for (const d of docs) tx = tx.createOrReplace(d);
  await tx.commit();
  console.log("✓ Migration complete.\n");
}

run().catch((err) => {
  console.error("\n✗ Migration failed:", err.message);
  process.exit(1);
});
