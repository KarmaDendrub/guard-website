import type { Metadata } from "next";
import { ServiceDetail } from "@/components/service-detail";

export const metadata: Metadata = {
  title: "Дротова охоронна сигналізація",
};

export default function Page() {
  return <ServiceDetail serviceKey="provodna" />;
}
