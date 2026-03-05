import { getPageMetadata } from "@/lib/getMetadata";
import ValuationServicesPage from "../_components/ValuationServicePage";
 

export async function generateMetadata() {
  return getPageMetadata("valuation");
}

export default function Page() {
  return <ValuationServicesPage />;
}
