import {
  CodeSystemService,
  ConceptMapService,
  ValueSetService,
} from "services";

export default class DashboardService {
  static instance: DashboardService | null;

  async getCodeSystemsCount(): Promise<number> {
    return await CodeSystemService.getInstance()
      .getCodeSystems()
      .then((bundle) => bundle.total ?? 0);
  }

  async getConceptMapsCount(): Promise<number> {
    return await ConceptMapService.getInstance()
      .getConceptMaps()
      .then((bundle) => bundle.total ?? 0);
  }

  async getValueSetsCount(): Promise<number> {
    return await ValueSetService.getInstance()
      .getValueSets()
      .then((bundle) => bundle.total ?? 0);
  }

  static getInstance() {
    return this.instance ?? (this.instance = new DashboardService());
  }
}
