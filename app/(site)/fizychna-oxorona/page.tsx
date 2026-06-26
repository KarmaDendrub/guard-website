import type { Metadata } from "next";
import { ServiceDetail } from "@/components/service-detail";

export const metadata: Metadata = {
  title: "Фізична охорона об'єктів",
};

export default function Page() {
  return <ServiceDetail serviceKey="fizychna" />;
}
