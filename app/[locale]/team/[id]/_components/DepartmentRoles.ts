type LocaleRoles = {
  en: string;
  ka: string;
};

const DEPARTMENT_ROLES: Record<string, Record<string, LocaleRoles>> = {
  "maia-pheikrishvili": {
    "financial-audit": {
      en: "Managing Partner / Auditor",
      ka: "მმართველი პარტნიორი / აუდიტორი",
    },
    "tax-services": {
      en: "Auditor / Tax Consultant",
      ka: "აუდიტორი / კონსულტანტი საგადასახადო საკითხებში",
    },
    "valuation-services": {
      en: "Valuer",
      ka: "შემფასებელი",
    },
    "business-consulting": {
      en: "Consultant in Accounting and Taxation",
      ka: "კონსულტანტი აღრიცხვისა და გადასახადების საკითხებში",
    },
  },
  "nato-romanadze": {
    "financial-audit": {
      en: "Senior Auditor",
      ka: "უფროსი-აუდიტორი",
    },
    "valuation-services": {
      en: "Valuer",
      ka: "შემფასებელი",
    },
  },
  "mzia-gegechkori": {
    "financial-audit": {
      en: "Senior Auditor",
      ka: "უფროსი-აუდიტორი",
    },
    "valuation-services": {
      en: "Valuer",
      ka: "შემფასებელი",
    },
  },
  "romili-beridze": {
    "financial-audit": {
      en: "Senior Auditor",
      ka: "უფროსი-აუდიტორი",
    },
    "valuation-services": {
      en: "Valuer",
      ka: "შემფასებელი",
    },
  },
  "lali-chigogidze": {
    "financial-audit": {
      en: "Public Sector Auditor",
      ka: "საჯარო სექტორის აუდიტორი",
    },
    "tax-services": {
      en: "Tax Consultant",
      ka: "კონსულტანტი საგადასახადო საკითხებში",
    },
  },
  "gogita-baramidze": {
    "financial-audit": {
      en: "Senior Auditor",
      ka: "უფროსი-აუდიტორი",
    },
    "valuation-services": {
      en: "Valuer",
      ka: "შემფასებელი",
    },
  },
  "mzia-melikishvili": {
    "financial-audit": {
      en: "Junior Auditor / Certified Accountant",
      ka: "ჯუნიორ აუდიტორი / სერტიფიცირებული ბუღალტერი",
    },
    "valuation-services": {
      en: "Valuer",
      ka: "შემფასებელი",
    },
  },
  "rusudan-gugeshashvili": {
    "financial-audit": {
      en: "Junior Auditor",
      ka: "ჯუნიორ აუდიტორი",
    },
    "valuation-services": {
      en: "Valuer",
      ka: "შემფასებელი",
    },
  },
  "marine-lominadze": {
    "financial-audit": {
      en: "Junior Auditor",
      ka: "ჯუნიორ აუდიტორი",
    },
    "valuation-services": {
      en: "Valuer",
      ka: "შემფასებელი",
    },
  },
  "giorgi-seperteladze": {
    "financial-audit": {
      en: "Junior Auditor",
      ka: "ჯუნიორ აუდიტორი",
    },
    "valuation-services": {
      en: "Valuer",
      ka: "შემფასებელი",
    },
  },
  "nato-jabnidze": {
    "accounting-services": {
      en: "Head of Accounting & Reporting Department",
      ka: "აღრიცხვა / ანგარიშგების დეპარტამენტის ხელმძღვანელი",
    },
    "tax-services": {
      en: "Tax Consultant",
      ka: "კონსულტანტი საგადასახადო საკითხებში",
    },
  },
  "tamar-mzhavanadze": {
    "accounting-services": {
      en: "Chief Accountant",
      ka: "მთავარი ბუღალტერი",
    },
  },
  "rusudan-baramidze": {
    "accounting-services": {
      en: "Accountant",
      ka: "ბუღალტერი",
    },
  },
  "tamta-ustalishvili": {
    "accounting-services": {
      en: "Accountant",
      ka: "ბუღალტერი",
    },
  },
  "natia-khajishvili": {
    "accounting-services": {
      en: "Accountant",
      ka: "ბუღალტერი",
    },
  },
  "nutsa-jincharadze": {
    "accounting-services": {
      en: "Assistant Accountant",
      ka: "ასისტენტ-ბუღალტერი",
    },
  },
  "tornike-sergeevi": {
    "business-consulting": {
      en: "AML Specialist & Data Analyst",
      ka: "AML სპეციალისტი და მონაცემთა ანალიტიკოსი",
    },
  },
  "lasha-seperteladze": {
    "legal-support": {
      en: "Lawyer · Specialist in Tax Disputes",
      ka: "ადვოკატი · საგადასახადო დავების სპეციალისტი",
    },
    "business-consulting": {
      en: "Lawyer · Tax Consultant",
      ka: "იურისტი · კონსულტანტი საგადასახადო საკითხებში",
    },
    "tax-services": {
      en: "Tax Consultant",
      ka: "კონსულტანტი საგადასახადო საკითხებში",
    },
  },
};

export function getDepartmentRole(
  memberId: string,
  departmentKey: string,
  locale: string,
  fallback: string,
): string {
  const roles = DEPARTMENT_ROLES[memberId]?.[departmentKey];
  if (!roles) return fallback;
  return locale === "ka" ? roles.ka : roles.en;
}
