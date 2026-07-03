// Generates branded SVG placeholders for service cards that lack a real photo.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const OUT = resolve(process.cwd(), "public/images/services");
mkdirSync(OUT, { recursive: true });

// key -> short Ukrainian label shown on the placeholder
const placeholders = {
  pult: "Пультова охорона",
  provodna: "Дротова сигналізація",
  fizychna: "Фізична охорона",
  perimetr: "Периметральна\nсигналізація",
  skud: "Контроль доступу",
  vdoma: "Я дома під охороною",
  klaviatura: "Мобільна клавіатура",
  video: "Відеоспостереження",
  pozhezhna: "Пожежна сигналізація",
  grupy: "Мобільні групи",
  satelit: "Супутникове\nспостереження",
  kontrol: "Контроль роботи\nохорони",
  navchannya: "Навчальний\nцентр",
  suprovid: "Супровід\nвантажу",
  zhytlo: "Житло під\nохороною",
};

const W = 800;
const H = 600;

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function svg(label) {
  const lines = label.split("\n");
  const lineHeight = 56;
  const startY = H / 2 + 70 - ((lines.length - 1) * lineHeight) / 2;
  const tspans = lines
    .map(
      (line, i) =>
        `<tspan x="${W / 2}" y="${startY + i * lineHeight}">${escapeXml(line)}</tspan>`
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0D1A35"/>
      <stop offset="100%" stop-color="#1A2C5B"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0 L0 0 0 40" fill="none" stroke="#C9A84C" stroke-opacity="0.06" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <!-- shield emblem -->
  <g transform="translate(${W / 2}, 215)" fill="none" stroke="#C9A84C" stroke-width="6" stroke-linejoin="round">
    <path d="M0 -90 L80 -55 L80 25 C80 80 45 110 0 130 C-45 110 -80 80 -80 25 L-80 -55 Z"/>
    <path d="M-32 5 L-8 32 L40 -28" stroke-width="9" stroke-linecap="round"/>
  </g>
  <text font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="700"
        fill="#F4F6FA" text-anchor="middle">${tspans}</text>
  <text font-family="Arial, Helvetica, sans-serif" font-size="22" letter-spacing="4"
        fill="#C9A84C" text-anchor="middle" x="${W / 2}" y="${H - 40}">КОРПОРАЦІЯ ГУАРД</text>
</svg>`;
}

for (const [key, label] of Object.entries(placeholders)) {
  const file = resolve(OUT, `${key}.svg`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, svg(label), "utf8");
}

console.log(`Generated ${Object.keys(placeholders).length} placeholder SVGs in ${OUT}`);
