import {
  DashboardCardTranslations,
  Translations,
} from "../../../pages/api/translations";
import { MISSING_TRANSLATION } from "../../const";

export class TranslationService {
  static instance: TranslationService | null;
  translations: Translations | undefined;

  getDashboardCardTranslations(key: string): string {
    return (
      this.translations?.dashboard.cards[
        key as keyof DashboardCardTranslations
      ] ?? MISSING_TRANSLATION
    );
  }

  setTranslations(translations: Translations) {
    this.translations = translations;
  }

  static getInstance() {
    return this.instance ?? (this.instance = new TranslationService());
  }
}
