/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const messages = {
    main: (await import(`../messages/${locale}/main.json`)).default,
    about: (await import(`../messages/${locale}/about.json`)).default,
    contact: (await import(`../messages/${locale}/contact.json`)).default,
    financalAudit: (await import(`../messages/${locale}/financalAudit.json`))
      .default,
    taxServices: (await import(`../messages/${locale}/taxServices.json`))
      .default,
    accounting: (await import(`../messages/${locale}/accounting.json`)).default,
    valuation: (await import(`../messages/${locale}/valuation.json`)).default,
    legal: (await import(`../messages/${locale}/legal.json`)).default,
    consulting: (await import(`../messages/${locale}/consulting.json`)).default,
    team: (await import(`../messages/${locale}/team.json`)).default,
  };

  return {
    locale,
    messages,
  };
});
