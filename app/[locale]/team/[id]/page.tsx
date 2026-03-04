import { notFound } from "next/navigation";
import { getMemberByid, TEAM_MEMBERS } from "./_components/TeamMembers";
import { TeamMemberProfile } from "./_components/TeamMemberProfile";

interface Props {
  params: Promise<{ locale: string; id: string }>;
}
import { locales } from "@/i18n/routing";  

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    TEAM_MEMBERS.map((m) => ({ locale, id: m.id })),
  );
}

export default async function TeamMemberPage({ params }: Props) {
  const { id } = await params;
  const member = getMemberByid(id);

  if (!member) notFound();

  return <TeamMemberProfile member={member} />;
}
