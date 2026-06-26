import type { Metadata } from "next";
import { ServiceDetail } from "@/components/service-detail";

export const metadata: Metadata = {
  title: "Я дома під охороною",
};

export default function Page() {
  return <ServiceDetail serviceKey="vdoma" />;
}
