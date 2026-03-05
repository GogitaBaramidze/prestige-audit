import { getPageMetadata } from "@/lib/getMetadata";
import AccountingServicesPage from "../_components/AccountingPage";

export async function generateMetadata() {
  return getPageMetadata("accounting");
}

export default function Page() {
  return <AccountingServicesPage />;
}
