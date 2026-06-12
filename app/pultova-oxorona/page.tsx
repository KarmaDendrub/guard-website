import type { Metadata } from "next";
import { ServiceDetail } from "@/components/service-detail";

export const metadata: Metadata = {
  title: "Пультова охорона об'єктів",
};

export default function Page() {
  return <ServiceDetail serviceKey="pult" />;
}
