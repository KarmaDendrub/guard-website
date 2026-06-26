import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  currentLang,
  getSiteContent,
  getServicesGridContent,
} from "@/lib/content";

/** Site chrome (header + footer). The /studio route lives outside this group. */
export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const lang = await currentLang();
  const [site, services] = await Promise.all([
    getSiteContent(lang),
    getServicesGridContent(lang),
  ]);
  const footerLinks = services.map((s) => ({ title: s.title, href: s.href }));

  return (
    <div className="flex min-h-screen flex-col">
      <Header phones={site.phones} logo={site.logo} />
      <main className="flex-1">{children}</main>
      <Footer
        phones={site.phones}
        socials={site.socials}
        services={footerLinks}
        logo={site.logo}
        companyName={site.companyName}
        city={site.city}
      />
    </div>
  );
}
