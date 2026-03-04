import { useTranslations } from "next-intl";
import { Users } from "lucide-react";
import TeamHeroMotion from "./TeamHeroMotion";

export default function TeamHeroSection() {
  const t = useTranslations("team");
  return <TeamHeroMotion badgeLabel={t("ui.meetTheExperts")} />;
}
