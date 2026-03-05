import { getPageMetadata } from "@/lib/getMetadata";
import LegalSupportPage from "../_components/LegaServicePage";

export async function generateMetadata() {
  return getPageMetadata("legal");
}

export default function Page() {
  return <LegalSupportPage />;
}
