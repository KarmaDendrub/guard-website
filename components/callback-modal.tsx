"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Phone, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, type ButtonProps } from "@/components/ui/button";

type CallbackModalProps = {
  /** Trigger button label; defaults to the i18n "header.callback" string. */
  triggerLabel?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  withIcon?: boolean;
};

export function CallbackModal({
  triggerLabel,
  variant = "gold",
  size = "default",
  className,
  withIcon = true,
}: CallbackModalProps) {
  const t = useTranslations("callback");
  const tHeader = useTranslations("header");
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // No backend yet — simulate a successful request.
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      // reset after the close animation
      setTimeout(() => setSubmitted(false), 300);
    }, 2200);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          {withIcon && <Phone />}
          {triggerLabel ?? tHeader("callback")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <CheckCircle2 className="h-14 w-14 text-gold" />
            <p className="text-lg font-semibold text-navy-dark">{t("success")}</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{t("title")}</DialogTitle>
              <DialogDescription>{t("desc")}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-navy-dark">{t("name")}</span>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={t("namePlaceholder")}
                  className="h-11 rounded-md border border-border px-3 text-navy-dark outline-none focus:border-gold focus:ring-2 focus:ring-gold/40"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-navy-dark">{t("phone")}</span>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder={t("phonePlaceholder")}
                  className="h-11 rounded-md border border-border px-3 text-navy-dark outline-none focus:border-gold focus:ring-2 focus:ring-gold/40"
                />
              </label>
              <Button type="submit" variant="danger" size="lg" className="mt-2 w-full">
                <Phone />
                {t("submit")}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
