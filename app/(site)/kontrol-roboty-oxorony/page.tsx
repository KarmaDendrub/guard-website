import type { Metadata } from "next";
import { ServiceDetail } from "@/components/service-detail";

export const metadata: Metadata = {
  title: "Контроль роботи охорони замовника",
};

export default function Page() {
  return <ServiceDetail serviceKey="kontrol" />;
}
