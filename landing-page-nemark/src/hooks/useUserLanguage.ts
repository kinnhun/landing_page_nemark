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
    i18n.language ?? i18n.resolvedLanguage ?? (() => {
      const fallback = i18n.options?.fallbackLng;
      if (typeof fallback === 'string') return fallback;
      if (Array.isArray(fallback) && fallback.length > 0) return fallback[0];
      return 'en';
    })();

  return [t as TFunction, lang, setLanguage] as const;
}

export default useUserLanguage;
