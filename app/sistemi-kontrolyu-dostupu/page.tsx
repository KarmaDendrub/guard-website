import type { Metadata } from "next";
import { ServiceDetail } from "@/components/service-detail";

export const metadata: Metadata = {
  title: "Системи контролю доступу",
};

export default function Page() {
  return <ServiceDetail serviceKey="skud" />;
}
