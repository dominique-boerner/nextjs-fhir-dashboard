import { Bundle } from "fhir/r4";
import { API_ENDPOINTS } from "../../const";

/**
 * Service for fetching ConceptMaps from the api.
 */
export class ConceptMapService {
  static instance: ConceptMapService | null;

  async getConceptMaps(): Promise<Bundle> {
    return fetch(`${API_ENDPOINTS.CONCEPT_MAP}`)
      .then((response) => response.json())
      .then((data) => data);
  }

  async getConceptMap(name: string): Promise<Bundle> {
    return fetch(`${API_ENDPOINTS.CONCEPT_MAP}/${name}`)
      .then((response) => response.json())
      .then((data) => data);
  }

  static getInstance() {
    return this.instance ?? (this.instance = new ConceptMapService());
  }
}
