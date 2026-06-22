import type { Metadata } from "next";
import { ServiceDetail } from "@/components/service-detail";

export const metadata: Metadata = {
  title: "Бездротові та дротові домофони",
};

export default function Page() {
  return <ServiceDetail serviceKey="domofony" />;
}
