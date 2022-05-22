import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Loading, NextUIProvider } from "@nextui-org/react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import { useFetchTranslations } from "../common/hooks/use-fetch-translations/useFetchTranslations";
import { Translations } from "./api/translations";
import { lightTheme } from "../common/theme";
import { TranslationService } from "services/translation-service/TranslationService";

config.autoAddCss = false;

export const TranslationContext = React.createContext<Translations | undefined>(
  undefined
);

export default function MyApp({ Component, pageProps }: AppProps) {
  const translations = useFetchTranslations();

  if (translations) {
    TranslationService.getInstance().setTranslations(translations);
    return (
      <TranslationContext.Provider value={translations}>
        <NextUIProvider theme={lightTheme}>
          <div className="page-wrapper">
            <div className="w-full">
              <Component {...pageProps} />
            </div>
          </div>
        </NextUIProvider>
      </TranslationContext.Provider>
    );
  } else {
    return (
      <NextUIProvider theme={lightTheme}>
        <div className="flex flex-col justify-center items-center h-screen">
          <Loading type="points" size="xl" color="primary" />
        </div>
      </NextUIProvider>
    );
  }
}
