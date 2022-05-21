import { CodeSystemService } from "../code-system-service/code-system.service";
import { ValueSetService } from "../value-set-service/value-set.service";
import { ConceptMapService } from "../concept-map-service/concept-map.service";
import { System } from "../../../features/dashboard/models/system";
import { Bundle } from "fhir/r4";

export class SearchService {
  static instance: SearchService | null;

  async search(searchSystem: System, search: string): Promise<Bundle> {
    let result: Bundle;
    switch (searchSystem) {
      case "codeSystem":
        result = await CodeSystemService.getInstance().getCodeSystem(search);
        break;
      case "valueSet":
        result = await ValueSetService.getInstance().getValueSet(search);
        break;
      case "conceptMap":
        result = await ConceptMapService.getInstance().getConceptMap(search);
        break;
    }
    return result;
  }

  static getInstance() {
    return this.instance ?? (this.instance = new SearchService());
  }
}
