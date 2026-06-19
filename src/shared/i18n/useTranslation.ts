import { dictionaries, type TranslationKey } from "./dictionaries";
import { useLocaleStore } from "./store";

export function useTranslation() {
  const locale = useLocaleStore((state) => state.locale);
  const setLocale = useLocaleStore((state) => state.setLocale);

  const t = (key: TranslationKey) => dictionaries[locale][key];

  return { locale, setLocale, t };
}
