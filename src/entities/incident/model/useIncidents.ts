import { useMemo } from "react";
import rawIncidents from "../../../../incidents.mock.json";
import { parseIncidents } from "./parseIncidents";
import { useIncidentStore } from "./store";

const seedIncidents = parseIncidents(rawIncidents);

export function useIncidents() {
  const createdIncidents = useIncidentStore((state) => state.createdIncidents);

  return useMemo(() => [...seedIncidents, ...createdIncidents], [createdIncidents]);
}
