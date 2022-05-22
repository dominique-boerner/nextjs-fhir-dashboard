import { Bundle } from "fhir/r4";
import { API_ENDPOINTS } from "../../const";

/**
 * Service for fetching ValueSets from the api.
 */
export class ValueSetService {
  static instance: ValueSetService | null;

  async getValueSets(): Promise<Bundle> {
    return fetch(`${API_ENDPOINTS.VALUE_SET}`)
      .then((response) => response.json())
      .then((data) => data);
  }

  async getValueSet(name: string): Promise<Bundle> {
    return fetch(`${API_ENDPOINTS.VALUE_SET}/${name}`)
      .then((response) => response.json())
      .then((data) => data);
  }

  static getInstance() {
    return this.instance ?? (this.instance = new ValueSetService());
  }
}
