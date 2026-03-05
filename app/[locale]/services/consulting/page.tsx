import { getPageMetadata } from "@/lib/getMetadata";
import BusinessConsultingPage from "../_components/ConsultingPage";

export async function generateMetadata() {
  return getPageMetadata("consulting");
}

export default function Page() {
  return <BusinessConsultingPage />;
}
