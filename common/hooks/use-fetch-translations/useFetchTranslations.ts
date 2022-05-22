import { useEffect, useState } from "react";
import { Translations } from "../../../pages/api/translations";

/**
 * Fetch and return the translations from /api/translations.
 */
export const useFetchTranslations = () => {
  const [translations, setTranslations] = useState<Translations>();

  useEffect(() => {
    fetch("/api/translations")
      .then((response) => response.json())
      .then((translations) =>
        // fake timeout for demonstration purpose!
        setTimeout(() => setTranslations(translations), 2000)
      );
  }, []);

  return translations;
};
