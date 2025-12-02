import type { TFunction } from 'i18next';

/**
 * Result returned by `i18n.changeLanguage` when a TFunction is available,
 * or `null` when no function is returned. Using `null` here makes the
 * meaning explicit instead of using `undefined`.
 */
export type ChangeLanguageResult = TFunction | null;
