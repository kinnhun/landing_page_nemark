import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import type { ChangeLanguageResult } from "../types/i18n";

type UseUserLanguageReturn = readonly [
  TFunction,
  string,
  (lng: string) => Promise<ChangeLanguageResult>,
];

/**
 * Hook that returns `[t, language, setLanguage]` for convenient destructuring.
 * Example: `const [t, lang, setLang] = useUserLanguage();`
 */
function useUserLanguage(ns?: string | string[]): UseUserLanguageReturn {
  const { t, i18n } = useTranslation(ns);

  const setLanguage = useCallback(
    (lng: string): Promise<ChangeLanguageResult> =>
      i18n.changeLanguage(lng).then((res) => res ?? null),
    [i18n]
  );

  const lang =
    i18n.language ||
    (typeof i18n.options.fallbackLng === "string"
      ? i18n.options.fallbackLng
      : Array.isArray(i18n.options.fallbackLng)
        ? i18n.options.fallbackLng[0]
        : "en");

  return [t as TFunction, lang, setLanguage] as const;
}

export default useUserLanguage;
