import { Bundle } from "fhir/r4";
import { API_ENDPOINTS } from "../../const";

/**
 * Service for fetching CodeSystems from the api.
 */
export class CodeSystemService {
  static instance: CodeSystemService | null;

  async getCodeSystems(): Promise<Bundle> {
    return fetch(`${API_ENDPOINTS.CODE_SYSTEM}`)
      .then((response) => response.json())
      .then((data) => data);
  }

  async getCodeSystem(name: string): Promise<Bundle> {
    return fetch(`${API_ENDPOINTS.CODE_SYSTEM}/${name}`)
      .then((response) => response.json())
      .then((data) => data);
  }

  static getInstance() {
    return this.instance ?? (this.instance = new CodeSystemService());
  }
}
