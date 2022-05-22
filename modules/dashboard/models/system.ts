import {Tab} from "components/tabs/models/tab";

export type System = "codeSystem" | "valueSet" | "conceptMap";

export const tabSystems: Tab<System>[] = [
  {
    value: "codeSystem",
    label: "CodeSystem"
  },
  {
    value: "conceptMap",
    label: "ConceptMap"
  },
  {
    value: "valueSet",
    label: "ValueSet"
  },
]