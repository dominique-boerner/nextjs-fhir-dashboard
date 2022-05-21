import { NextApiRequest, NextApiResponse } from "next";
import { Bundle } from "fhir/r4";

/**
 * Get CodeSystem from pyrohealth public api
 */
async function getCodeSystem(): Promise<Bundle> {
  return await fetch("https://r4.test.pyrohealth.net/fhir/CodeSystem", {
    headers: {
      accept: "application/fhir+json",
    },
  })
    .then((response) => response.json())
    .then((data) => data);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Bundle>
) {
  const data = await getCodeSystem();
  res.status(200).json(data);
}
