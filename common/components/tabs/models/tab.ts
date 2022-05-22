import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

export interface Tab<T> {
  value: T;
  label?: string;
  icon?: IconDefinition;
}