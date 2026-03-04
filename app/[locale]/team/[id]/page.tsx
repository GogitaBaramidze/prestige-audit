import { notFound } from "next/navigation";
import { getMemberByid, TEAM_MEMBERS } from "./_components/TeamMembers";
import { TeamMemberProfile } from "./_components/TeamMemberProfile";

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateStaticParams() {
  return TEAM_MEMBERS.map((m) => ({ id: m.id }));
}

export default async function TeamMemberPage({ params }: Props) {
  const { id } = await params;
  const member = getMemberByid(id);

  if (!member) notFound();

  return <TeamMemberProfile member={member} />;
}
