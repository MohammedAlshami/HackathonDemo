export const i18n = {
  defaultLocale: "en",
  locales: ["en", "ar", "my"],
};

export type Locale = (typeof i18n)["locales"][number];
