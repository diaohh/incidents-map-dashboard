import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import type { Incident } from "@/entities/incident";
import { getIncidentBounds } from "@/entities/incident";

interface UseMapboxOptions {
  token: string;
  incidents: Incident[];
}

export function useMapbox({ token, incidents }: UseMapboxOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    mapboxgl.accessToken = token;
    setError(false);

    const instance = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
    });

    instance.on("error", () => setError(true));

    if (incidents.length > 0) {
      instance.fitBounds(getIncidentBounds(incidents), { padding: 48, maxZoom: 16, duration: 0 });
    }

    setMap(instance);

    return () => {
      instance.remove();
      setMap(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return { containerRef, map, error };
}
