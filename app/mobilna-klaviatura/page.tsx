import type { Metadata } from "next";
import { ServiceDetail } from "@/components/service-detail";

export const metadata: Metadata = {
  title: "Мобільна клавіатура",
};

export default function Page() {
  return <ServiceDetail serviceKey="klaviatura" />;
}
