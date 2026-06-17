import type { Metadata } from "next";
import { Phone, MapPin, Clock, Mail, Building2, Users, Calculator, FileText } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { CallbackModal } from "@/components/callback-modal";

export const metadata: Metadata = {
  title: "Контакти",
  description: "Контакти Корпорації «ГУАРД» у Дніпрі: телефони, адреса, режим роботи.",
};

const DEPARTMENTS = [
  {
    icon: Building2,
    title: "Приймальна офісу",
    phones: ["+38 (056) 766-07-17", "+38 (067) 632-19-91", "+38 (066) 235-74-19", "+38 (063) 308-93-76"],
  },
  {
    icon: FileText,
    title: "Договірний відділ",
    phones: ["+38 (067) 005-74-76"],
  },
  {
    icon: Calculator,
    title: "Бухгалтерія",
    phones: ["+38 (056) 766-07-22"],
  },
  {
    icon: Users,
    title: "Відділ кадрів",
    phones: ["+38 (067) 577-38-65", "+38 (063) 347-78-64"],
    email: "kadry@guard.ua",
  },
  {
    icon: Phone,
    title: "Диспетчерська служба «ГУАРД» (Дніпро, вул. Калинова, 87)",
    phones: [
      "+38 (056) 766-07-18",
      "+38 (067) 543-00-83",
      "+38 (067) 634-43-42",
      "+38 (050) 484-27-14",
      "+38 (050) 484-26-84",
      "+38 (093) 750-27-84",
    ],
  },
  {
    icon: MapPin,
    title: "Новомосковська філія (м. Самар, вул. Гідності, 52, оф. 320)",
    phones: ["+38 (067) 632-19-91", "+38 (066) 235-74-19", "+38 (063) 308-93-76"],
  },
];

function telHref(display: string) {
  return "tel:" + display.replace(/[^\d+]/g, "");
}

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
                <Clock className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-heading text-lg font-bold text-ink">Режим роботи</h3>
                <p className="mt-2 text-ink/70">Цілодобово, без вихідних — 24/7</p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold-dark">
                <Mail className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-heading text-lg font-bold text-ink">Загальна пошта</h3>
                <a
                  href="mailto:office@guard.ua"
                  className="mt-2 inline-block font-medium text-ink transition-colors hover:text-gold-dark"
                >
                  office@guard.ua
                </a>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {DEPARTMENTS.map((dept) => {
                const Icon = dept.icon;
                return (
                  <div
                    key={dept.title}
                    className="rounded-2xl border border-border bg-light p-5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold-dark">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h4 className="font-heading text-sm font-bold leading-snug text-ink">
                        {dept.title}
                      </h4>
                    </div>
                    <ul className="mt-3 space-y-1">
                      {dept.phones.map((p) => (
                        <li key={p}>
                          <a
                            href={telHref(p)}
                            className="text-sm font-medium text-ink transition-colors hover:text-gold-dark"
                          >
                            {p}
                          </a>
                        </li>
                      ))}
                    </ul>
                    {dept.email && (
                      <a
                        href={`mailto:${dept.email}`}
                        className="mt-2 inline-block text-sm text-gold-dark hover:underline"
                      >
                        {dept.email}
                      </a>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold-dark">
                <Phone className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-heading text-lg font-bold text-ink">Зворотній зв'язок</h3>
                <p className="mt-2 text-ink/70">
                  Залиште заявку — і ми передзвонимо вам найближчим часом.
                </p>
                <CallbackModal variant="danger" className="mt-3" />
              </div>
            </div>

          </div>

          {/* Google Maps — точный Place ID */}
          <div className="overflow-hidden rounded-2xl shadow-card-hover">
            <iframe
              title="Корпорація «ГУАРД» на карті"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2641.5!2d35.0519!3d48.5148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d958b89002dcbd%3A0x8babb2835c25531a!2z0JPQo9CQ0KDQlCAoR1VBUkQp!5e0!3m2!1suk!2sua!4v1718000000000!5m2!1suk!2sua"
              className="h-full min-h-[480px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
