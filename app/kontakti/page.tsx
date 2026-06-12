import type { Metadata } from "next";
import { Phone, MapPin, Clock, Mail } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { CallbackModal } from "@/components/callback-modal";
import { PHONES, COMPANY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакти",
  description: "Контакти Корпорації ГУАРД у Дніпрі: телефони, адреса, режим роботи.",
};

export default function KontaktiPage() {
  return (
    <>
      <PageHeader
        title="Контакти"
        subtitle="Зв'яжіться з нами зручним способом — ми на зв'язку цілодобово."
        breadcrumb="Контакти"
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold-dark">
                <Phone className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-heading text-lg font-bold text-navy-dark">Телефони</h3>
                <ul className="mt-2 space-y-1">
                  {PHONES.map((p) => (
                    <li key={p.tel}>
                      <a
                        href={`tel:${p.tel}`}
                        className="font-medium text-navy transition-colors hover:text-gold-dark"
                      >
                        {p.display}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold-dark">
                <MapPin className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-heading text-lg font-bold text-navy-dark">Адреса</h3>
                <p className="mt-2 text-navy/70">{COMPANY.city}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold-dark">
                <Clock className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-heading text-lg font-bold text-navy-dark">Режим роботи</h3>
                <p className="mt-2 text-navy/70">Цілодобово, без вихідних — 24/7</p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold-dark">
                <Mail className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-heading text-lg font-bold text-navy-dark">Зворотній зв'язок</h3>
                <p className="mt-2 text-navy/70">
                  Залиште заявку — і ми передзвонимо вам найближчим часом.
                </p>
                <CallbackModal variant="danger" className="mt-3" />
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl shadow-card-hover">
            <iframe
              title="Карта — Дніпро"
              src="https://www.google.com/maps?q=Дніпро&output=embed"
              className="h-full min-h-[400px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
