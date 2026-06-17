import { Phone } from "lucide-react";
import { PHONES } from "@/lib/site";
import { CallbackModal } from "@/components/callback-modal";

export function CtaBand() {
  return (
    <section className="bg-light py-14">
      <div className="container-x">
        <div className="relative flex flex-col items-center gap-6 overflow-hidden rounded-2xl bg-navy-gradient px-6 py-10 text-center text-ink shadow-card-hover sm:px-10">
          <div className="absolute inset-0 bg-shield-grid opacity-50" />
          <div className="relative">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              Потрібна надійна охорона?
            </h2>
            <p className="mt-3 text-ink/70">
              Залиште заявку — наш фахівець підбере оптимальне рішення для вашого об'єкта.
            </p>
          </div>
          <div className="relative flex flex-col items-center gap-4 sm:flex-row">
            <CallbackModal variant="danger" size="lg" />
            <a
              href={`tel:${PHONES[0].tel}`}
              className="inline-flex items-center gap-2 text-lg font-semibold text-gold-dark transition-colors hover:text-gold-dark"
            >
              <Phone className="h-5 w-5" />
              {PHONES[0].display}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
