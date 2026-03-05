import { getPageMetadata } from "@/lib/getMetadata";
import ServicesPageClient from "./_components/ServicePageClient";

export async function generateMetadata() {
  return getPageMetadata("services");
}

export default function ServicesPage() {
  return <ServicesPageClient />;
}
