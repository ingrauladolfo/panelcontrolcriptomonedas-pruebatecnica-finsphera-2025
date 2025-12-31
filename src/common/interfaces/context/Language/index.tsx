/* This code snippet is defining an interface named `LanguageContextValue` in TypeScript for a React
application. */
interface LanguageContextValue {
  lang: 'en' | 'es';
  toggleLang: () => void;
  setLang: (lang: 'en' | 'es') => void;
}

export type { LanguageContextValue }