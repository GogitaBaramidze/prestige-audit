import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import { getMemberByid, TEAM_MEMBERS } from "./_components/TeamMembers";
import { TeamMemberProfile } from "./_components/TeamMemberProfile";
import { locales } from "@/i18n/routing";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    TEAM_MEMBERS.map((m) => ({ locale, id: m.id })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const member = getMemberByid(id);

  if (!member) return {};

  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "team" });

  const name = t(`members.${id}.name`);
  const title = t(`members.${id}.title`);

  const imageUrl = member.image.startsWith("/")
    ? `${member.image}`
    : member.image;

  return {
    title: `${name} | Prestige Audit`,
    description: `${name} — ${title}. Prestige Audit LLC, Batumi, Georgia.`,
    openGraph: {
      title: name,
      description: `${title} · Prestige Audit`,
      siteName: "Prestige Audit",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 1000,
          alt: name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description: `${title} · Prestige Audit`,
      images: [imageUrl],
    },
  };
}

export default async function TeamMemberPage({ params }: Props) {
  const { id } = await params;
  const member = getMemberByid(id);

  if (!member) notFound();

  return <TeamMemberProfile member={member} />;
}
