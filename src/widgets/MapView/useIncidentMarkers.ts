import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { createMarkerElement } from "@/entities/incident";
import type { Incident } from "@/entities/incident";

interface UseIncidentMarkersOptions {
  map: mapboxgl.Map | null;
  incidents: Incident[];
  onSelect: (id: string) => void;
}

export function useIncidentMarkers({ map, incidents, onSelect }: UseIncidentMarkersOptions) {
  useEffect(() => {
    if (!map) return;

    const markers = incidents.map((incident) => {
      const element = createMarkerElement(incident);
      element.addEventListener("click", () => onSelect(incident.id));

      return new mapboxgl.Marker({ element })
        .setLngLat([incident.coordinates.lng, incident.coordinates.lat])
        .addTo(map);
    });

    return () => {
      markers.forEach((marker) => marker.remove());
    };
  }, [map, incidents, onSelect]);
}
