import type { NextApiRequest, NextApiResponse } from "next";

export interface DashboardCardTranslations {
  codeSystemTitle: string;
  conceptMapTitle: string;
  valueSetTitle: string;
}

interface DashboardTranslations {
  cards: DashboardCardTranslations;
}

interface CommonTranslations {
  valueSet: string;
  codeSystem: string;
  conceptMap: string;
}

export interface Translations {
  common: CommonTranslations;
  dashboard: DashboardTranslations;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Translations>
) {
  res.status(200).json({
    common: {
      codeSystem: "CodeSystem",
      conceptMap: "ConceptMap",
      valueSet: "ValueSet",
    },
    dashboard: {
      cards: {
        codeSystemTitle: "CodeSystems",
        conceptMapTitle: "ConceptMaps",
        valueSetTitle: "ValueSets",
      },
    },
  });
}
