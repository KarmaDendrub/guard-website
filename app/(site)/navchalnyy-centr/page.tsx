import type { Metadata } from "next";
import { ServiceDetail } from "@/components/service-detail";

export const metadata: Metadata = {
  title: "Навчальний центр",
};

export default function Page() {
  return <ServiceDetail serviceKey="navchannya" />;
}
