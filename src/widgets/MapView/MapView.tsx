"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { mapboxToken } from "@/shared/config";
import { useTranslation } from "@/shared/i18n";
import { IncidentCard, useIncidents, useIncidentStore } from "@/entities/incident";
import { useMapbox } from "./useMapbox";
import { useIncidentMarkers } from "./useIncidentMarkers";
import styles from "./MapView.module.scss";

export function MapView() {
  const { t } = useTranslation();
  const incidents = useIncidents();
  const selectedIncidentId = useIncidentStore((state) => state.selectedIncidentId);
  const selectIncident = useIncidentStore((state) => state.selectIncident);

  if (!mapboxToken) {
    return (
      <div className={styles.tokenMissing}>
        <p className={styles.tokenMissingTitle}>{t("mapView.tokenMissing.title")}</p>
        <p>{t("mapView.tokenMissing.body")}</p>
      </div>
    );
  }

  return (
    <MapCanvas
      token={mapboxToken}
      incidents={incidents}
      selectedIncidentId={selectedIncidentId}
      onSelect={selectIncident}
    />
  );
}

interface MapCanvasProps {
  token: string;
  incidents: ReturnType<typeof useIncidents>;
  selectedIncidentId: string | null;
  onSelect: (id: string | null) => void;
}

function MapCanvas({ token, incidents, selectedIncidentId, onSelect }: MapCanvasProps) {
  const { containerRef, map } = useMapbox({ token, incidents });
  useIncidentMarkers({ map, incidents, onSelect });

  const selectedIncident = incidents.find((incident) => incident.id === selectedIncidentId);

  return (
    <div className={styles.root}>
      <div ref={containerRef} className={styles.map} />
      {selectedIncident && (
        <div className={styles.cardOverlay}>
          <IncidentCard incident={selectedIncident} onClose={() => onSelect(null)} />
        </div>
      )}
    </div>
  );
}
