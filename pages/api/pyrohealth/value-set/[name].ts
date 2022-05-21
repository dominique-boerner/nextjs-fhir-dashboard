import { NextApiRequest, NextApiResponse } from "next";
import { Bundle } from "fhir/r4";

/**
 * Get CodeSystem from pyrohealth public api
 */
async function getValueSetByName(name: string): Promise<Bundle> {
  return await fetch(
    `https://r4.test.pyrohealth.net/fhir/ValueSet?name=${name}`,
    {
      headers: {
        accept: "application/fhir+json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Bundle>
) {
  const { name } = req.query;
  const data = await getValueSetByName(name[0]);
  res.status(200).json(data);
}
