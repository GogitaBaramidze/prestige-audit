export interface MemberMeta {
  id: string;
  image: string;
  phone: string;
  email: string;
  address: string;
  department: string;
}

export const TEAM_MEMBERS: MemberMeta[] = [
  {
    id: "gogita-baramidze",
    image: "/team/gogita-baramidze.png",
    phone: "+995 595 91 22 96",
    email: "Gobaramidze@gmail.com",
    address: "Apt 12, 7a Aghmashenebeli St., Batumi",
    department: "financial-audit",
  },
  {
    id: "tamar-mzhavanadze",
    image: "/team/tamar-mjavanadze.png",
    phone: "+995 514 81 00 11",
    email: "Tmjavanadze1984@gmail.com",
    address: "Sh. Khimshiashvili Street N 41, Batumi",
    department: "accounting-services",
  },
  {
    id: "tamta-ustalishvili",
    image: "/team/tamta-ustalashvili.png",
    phone: "+995 595 46 84 36",
    email: "ttamta274@gmail.com",
    address: "Legva Village, Kobuleti, Georgia",
    department: "accounting-services",
  },
  {
    id: "tornike-sergeevi",
    image: "/team/tornike-sergeevi.png",
    phone: "+995 598 26 70 91",
    email: "tornikesergeevi@gmail.com",
    address: "Batumi, Georgia",
    department: "business-consulting",
  },
  {
    id: "lali-chigogidze",
    image: "/team/lali-chigogidze.png",
    phone: "+995 577 11 21 02",
    email: "lalichigogidze@gmail.com",
    address: "Batumi, Georgia",
    department: "financial-audit",
  },
  {
    id: "maia-pheikrishvili",
    image: "/team/maia-seperteladze.png",
    phone: "+995 577 43 83 08",
    email: "maiaph19@gmail.com",
    address: "78/88 Chavchavadze, Batumi, Georgia",
    department: "financial-audit",
  },
  {
    id: "marine-lominadze",
    image: "/team/marine-lominadze.png",
    phone: "+995 577 588 584",
    email: "marikalominadze78@gmail.com",
    address: "5 Abuseridze St., 6000, Batumi, Georgia",
    department: "financial-audit",
  },
  {
    id: "mzia-gegechkori",
    image: "/team/mzia-gegechkori.png",
    phone: "+995 593 20 93 83",
    email: "mziagege62@mail.ru",
    address: "26 May Street No. 78, Apt. 18, Batumi, Georgia",
    department: "financial-audit",
  },
  {
    id: "mzia-melikishvili",
    image: "/team/mzia-melikishvili.png",
    phone: "+995 597 97 14 83",
    email: "mzia1988@gmail.com",
    address: "48 J. Katamadze St., Batumi, 6000",
    department: "accounting-services",
  },
  {
    id: "natia-khajishvili",
    image: "/team/natia-khajishvili.png",
    phone: "+995 593 95 18 95",
    email: "natiakhajisvili@mail.ru",
    address: "78/88 Chavchavadze Street, Batumi",
    department: "financial-audit",
  },
  {
    id: "nato-romanadze",
    image: "/team/nato-romanadze.jpg",
    phone: "+995 558 16 28 23",
    email: "nato.romanadze@mail.ru",
    address: "N54/62 Gorgiladze Street, Batumi, Georgia",
    department: "financial-audit",
  },
  {
    id: "nato-jabnidze",
    image: "/team/nato-jabnidze.png",
    phone: "+995 595 30 49 04",
    email: "n.jabnidze@gmail.com",
    address: "Batumi, Georgia",
    department: "accounting-services",
  },
  {
    id: "nutsa-jincharadze",
    image: "/team/nuca-jincharadze.png",
    phone: "+995 557 38 26 47",
    email: "Nutsa.jincharadze05@gmail.com",
    address: "Village Tskavroka, Kobuleti, Georgia",
    department: "accounting-services",
  },
  {
    id: "romili-beridze",
    image: "/team/romil-beridze.png",
    phone: "+995 599 41 22 31",
    email: "beridze.romili@gmail.com",
    address: "Batumi, Georgia",
    department: "financial-audit",
  },
  {
    id: "rusudan-baramidze",
    image: "/team/rusuda-baramidze.png",
    phone: "+995 551 80 08 68",
    email: "rubaramidze@gmail.com",
    address: "Davit Agmashenebeli Street, No. 5, Batumi, Georgia",
    department: "financial-audit",
  },
  {
    id: "rusudan-gugeshashvili",
    image: "/team/rusudan-gugeshashvili.png",
    phone: "+995 593 40 80 01",
    email: "r.gugeshashvili@gmail.com",
    address: "58 May 26 Street, Batumi",
    department: "financial-audit",
  },
  {
    id: "giorgi-seperteladze",
    image: "/team/giorgi-seperteladze.png",
    phone: "+995 598 68 68 46",
    email: "sepherteladze.g@gmail.com",
    address: "Gorgiladze St. N96, Batumi, 6000",
    department: "financial-audit",
  },
];

export function getMemberByid(id: string): MemberMeta | undefined {
  return TEAM_MEMBERS.find((m) => m.id === id);
}
