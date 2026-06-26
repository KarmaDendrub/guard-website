import type { Metadata } from "next";
import { ServiceDetail } from "@/components/service-detail";

export const metadata: Metadata = {
  title: "Периметральна сигналізація",
};

export default function Page() {
  return <ServiceDetail serviceKey="perimetr" />;
}
