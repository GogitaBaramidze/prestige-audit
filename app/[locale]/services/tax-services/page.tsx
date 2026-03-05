import { getPageMetadata } from "@/lib/getMetadata";
import TaxServicesPage from "../_components/TaxServicePage";

export async function generateMetadata() {
  return getPageMetadata("tax-services");
}

export default function Page() {
  return <TaxServicesPage />;
}
