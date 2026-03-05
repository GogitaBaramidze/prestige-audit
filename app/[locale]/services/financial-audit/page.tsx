import { getPageMetadata } from "@/lib/getMetadata";
import FinancialAuditPage from "../_components/FinancalAuditPage";

export async function generateMetadata() {
  return getPageMetadata("financial-audit");
}

export default function Page() {
  return <FinancialAuditPage />;
}
