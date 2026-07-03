/**
 * Client edits — services (batch 2026-07):
 *   1. Convert every service `description` from plain localeText → Portable Text
 *      (so paragraphs/spacing/lists work and Anna can format in the Studio).
 *   2. Delete "SMS ГУАРД" and "JABLOTRON" services.
 *   3. Create 4 new services (Контроль роботи охорони / Навчальний центр /
 *      Супровід вантажу / Житло під охороною) with placeholder photos.
 *
 * Run from project root (TLS bypass for the local MITM proxy):
 *   NODE_TLS_REJECT_UNAUTHORIZED=0 node --env-file=.env.local scripts/apply-client-edits.mjs
 *
 * Idempotent: safe to run more than once.
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
  console.error("Missing env (NEXT_PUBLIC_SANITY_PROJECT_ID / _DATASET / SANITY_API_TOKEN).");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-01-01", useCdn: false });

// ---- helpers --------------------------------------------------------------

/** Plain string (multi-paragraph) → Portable Text block array. */
function textToBlocks(text) {
  if (!text || typeof text !== "string") return [];
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((para, i) => ({
      _type: "block",
      _key: `p${i}`,
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: `s${i}`, text: para, marks: [] }],
    }));
}

const localeBlocks = (uk, ru) => ({ uk: textToBlocks(uk), ru: textToBlocks(ru ?? uk) });

const assetCache = new Map();
async function image(relPath) {
  if (!relPath) return undefined;
  const filename = basename(relPath);
  if (assetCache.has(filename)) return assetCache.get(filename);
  const abs = join(PUB, relPath.replace(/^\//, ""));
  if (!existsSync(abs)) {
    console.warn(`  ! missing image, skipping: ${relPath}`);
    return undefined;
  }
  const existing = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename == $f][0]._id`,
    { f: filename }
  );
  let assetId = existing;
  if (!assetId) {
    process.stdout.write(`  ↑ uploading ${filename} ... `);
    const asset = await client.assets.upload("image", createReadStream(abs), { filename });
    assetId = asset._id;
    console.log("done");
  }
  const ref = { _type: "image", asset: { _type: "reference", _ref: assetId } };
  assetCache.set(filename, ref);
  return ref;
}

// ---- 1. migrate existing descriptions to Portable Text --------------------

async function migrateDescriptions() {
  const rows = await client.fetch(
    `*[_type == "service"]{ _id, "uk": description.uk, "ru": description.ru }`
  );
  let tx = client.transaction();
  let n = 0;
  for (const r of rows) {
    // Already Portable Text (array) → skip; only convert plain strings.
    if (typeof r.uk === "string" || typeof r.ru === "string") {
      tx = tx.patch(r._id, (p) =>
        p.set({
          description: {
            uk: textToBlocks(typeof r.uk === "string" ? r.uk : ""),
            ru: textToBlocks(typeof r.ru === "string" ? r.ru : ""),
          },
        })
      );
      n++;
    }
  }
  if (n) await tx.commit();
  console.log(`• descriptions → Portable Text: converted ${n}`);
}

// ---- 2. delete removed services -------------------------------------------

async function deleteRemoved() {
  const ids = ["service-sms", "service-jablotron"];
  // also match by slug in case ids differ
  const bySlug = await client.fetch(
    `*[_type == "service" && slug.current in ["sms-guard", "bezdrotova-signalizaciya-jablotron"]]._id`
  );
  const all = [...new Set([...ids, ...bySlug])];
  let tx = client.transaction();
  for (const id of all) tx = tx.delete(id);
  await tx.commit();
  console.log(`• deleted services: ${all.join(", ") || "(none)"}`);
}

// ---- 3. create new services -----------------------------------------------

const NEW_SERVICES = [
  {
    id: "kontrol", slug: "kontrol-roboty-oxorony", icon: "MonitorCheck", img: "/images/services/kontrol.svg",
    titleUk: "Контроль роботи охорони замовника", titleRu: "Контроль работы охраны заказчика",
    descUk: "Незалежний контроль якості роботи охоронних підрозділів безпосередньо на об'єктах замовника. Перевірка несення служби, дотримання інструкцій та реагування персоналу, регулярні звіти й рекомендації. Об'єктивна оцінка стану безпеки та підвищення ефективності вашої охорони.",
    descRu: "Независимый контроль качества работы охранных подразделений непосредственно на объектах заказчика. Проверка несения службы, соблюдения инструкций и реагирования персонала, регулярные отчёты и рекомендации. Объективная оценка состояния безопасности и повышение эффективности вашей охраны.",
  },
  {
    id: "navchannya", slug: "navchalnyy-centr", icon: "UserCheck", img: "/images/services/navchannya.svg",
    titleUk: "Навчальний центр", titleRu: "Учебный центр",
    descUk: "Професійна підготовка та підвищення кваліфікації охоронців і працівників служб безпеки. Теоретичні заняття та практичні тренування, юридична підготовка й відпрацювання дій у позаштатних ситуаціях. Видача відповідних документів після завершення навчання.",
    descRu: "Профессиональная подготовка и повышение квалификации охранников и работников служб безопасности. Теоретические занятия и практические тренировки, юридическая подготовка и отработка действий в нештатных ситуациях. Выдача соответствующих документов по завершении обучения.",
  },
  {
    id: "suprovid", slug: "suprovid-vantazhu", icon: "Car", img: "/images/services/suprovid.svg",
    titleUk: "Супровід вантажу", titleRu: "Сопровождение груза",
    descUk: "Озброєний супровід та охорона цінних вантажів під час перевезення у Дніпрі, області та по всій Україні. Професійні екіпажі, GPS-моніторинг маршруту та постійний зв'язок із диспетчерським центром. Гарантія збереження вантажу від пункту відправлення до місця призначення.",
    descRu: "Вооружённое сопровождение и охрана ценных грузов при перевозке в Днепре, области и по всей Украине. Профессиональные экипажи, GPS-мониторинг маршрута и постоянная связь с диспетчерским центром. Гарантия сохранности груза от пункта отправления до места назначения.",
  },
  {
    id: "zhytlo", slug: "zhytlo-pid-oxoronoyu", icon: "Home", img: "/images/services/zhytlo.svg",
    titleUk: "Житло під охороною", titleRu: "Жильё под охраной",
    descUk: "Комплексний захист квартир, приватних будинків та котеджів із виведенням сигналізації на пульт «ГУАРД». Тривожна кнопка, датчики руху, відкриття та задимлення, миттєвий виклик найближчої мобільної групи. Спокій і безпека вашої родини та майна цілодобово.",
    descRu: "Комплексная защита квартир, частных домов и коттеджей с выводом сигнализации на пульт «ГУАРД». Тревожная кнопка, датчики движения, открытия и задымления, мгновенный вызов ближайшей мобильной группы. Спокойствие и безопасность вашей семьи и имущества круглосуточно.",
  },
];

async function createNew() {
  const maxOrder = await client.fetch(`math::max(*[_type == "service"].order)`);
  let order = (typeof maxOrder === "number" ? maxOrder : 0) + 1;
  const docs = [];
  for (const s of NEW_SERVICES) {
    docs.push({
      _id: `service-${s.id}`,
      _type: "service",
      title: { _type: "localeString", uk: s.titleUk, ru: s.titleRu },
      slug: { _type: "slug", current: s.slug },
      description: localeBlocks(s.descUk, s.descRu),
      icon: s.icon,
      image: await image(s.img),
      inGrid: true,
      order: order++,
    });
  }
  let tx = client.transaction();
  for (const d of docs) tx = tx.createOrReplace(d);
  await tx.commit();
  console.log(`• created services: ${docs.map((d) => d._id).join(", ")}`);
}

// ---- run ------------------------------------------------------------------

async function run() {
  console.log(`\nApplying service edits → project ${projectId}/${dataset}\n`);
  await migrateDescriptions();
  await deleteRemoved();
  await createNew();
  console.log("\n✓ Done.\n");
}

run().catch((err) => {
  console.error("\n✗ Failed:", err.message);
  process.exit(1);
});
