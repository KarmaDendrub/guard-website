"use client";

import { Children, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";

/**
 * Renders `children` (one element per item, produced by the server-rendered
 * caller) inside `gridClassName`, showing only `initialCount` at first with a
 * "Show more" button underneath that reveals `step` more per click (client-side,
 * no reload). The button disappears once every item is visible.
 */
export function ShowMoreGrid({
  children,
  initialCount,
  step,
  gridClassName,
}: {
  children: ReactNode;
  initialCount: number;
  step: number;
  gridClassName: string;
}) {
  const t = useTranslations("common");
  const items = Children.toArray(children);
  const [count, setCount] = useState(initialCount);
  const visible = items.slice(0, count);
  const hasMore = count < items.length;

  return (
    <>
      <div className={gridClassName}>{visible}</div>
      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setCount((c) => c + step)}
            className="rounded-full border border-gold px-6 py-2.5 text-sm font-semibold text-gold-dark transition-colors hover:bg-gold hover:text-white"
          >
            {t("showMore")}
          </button>
        </div>
      )}
    </>
  );
}
