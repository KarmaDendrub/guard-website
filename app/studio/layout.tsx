/**
 * Standalone layout for the Studio: renders the editor full-screen without the
 * website header/footer (those live in the (site) route group).
 */
export const metadata = {
  title: "GUARD — Студія контенту",
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
