import type { Metadata } from "next";
import { ServiceDetail } from "@/components/service-detail";

export const metadata: Metadata = {
  title: "Дротова сигналізація",
};

export default function Page() {
  return <ServiceDetail serviceKey="provodna" />;
}
