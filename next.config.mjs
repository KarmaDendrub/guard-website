import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // SVG placeholders are served via <Image unoptimized> rather than through the
  // optimizer, so no dangerouslyAllowSVG is needed.
  images: {
    // Images uploaded to Sanity are served from its CDN.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default withNextIntl(nextConfig);
