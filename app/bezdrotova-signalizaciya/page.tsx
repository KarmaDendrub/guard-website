import type { Metadata } from "next";
import { ServiceDetail } from "@/components/service-detail";

export const metadata: Metadata = {
  title: "Бездротова сигналізація AJAX",
};

export default function Page() {
  return <ServiceDetail serviceKey="ajax" />;
}
