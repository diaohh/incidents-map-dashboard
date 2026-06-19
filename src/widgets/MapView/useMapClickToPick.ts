import { useEffect } from "react";
import type mapboxgl from "mapbox-gl";
import type { Coordinates } from "@/entities/incident";

interface UseMapClickToPickOptions {
  map: mapboxgl.Map | null;
  enabled: boolean;
  onPick: (coordinates: Coordinates) => void;
}

export function useMapClickToPick({ map, enabled, onPick }: UseMapClickToPickOptions) {
  useEffect(() => {
    if (!map || !enabled) return;

    const canvas = map.getCanvas();
    canvas.style.cursor = "crosshair";

    const handleClick = (event: mapboxgl.MapMouseEvent) => {
      onPick({ lat: event.lngLat.lat, lng: event.lngLat.lng });
    };

    map.on("click", handleClick);

    return () => {
      map.off("click", handleClick);
      canvas.style.cursor = "";
    };
  }, [map, enabled, onPick]);
}
