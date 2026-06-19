"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { mapboxToken } from "@/shared/config";
import { useTranslation } from "@/shared/i18n";
import { IncidentCard, useIncidents, useIncidentStore } from "@/entities/incident";
import {
  CreateIncidentModal,
  CreateIncidentTrigger,
  useCreateIncidentFlow,
} from "@/features/create-incident";
import { applyFilters, FilterBar, useFilterStore } from "@/features/filter-incidents";
import { useMapbox } from "./useMapbox";
import { useIncidentMarkers } from "./useIncidentMarkers";
import { useMapClickToPick } from "./useMapClickToPick";
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
  const filters = useFilterStore((state) => state);
  const filteredIncidents = applyFilters(incidents, filters);

  const { containerRef, map } = useMapbox({ token, incidents: filteredIncidents });
  useIncidentMarkers({ map, incidents: filteredIncidents, onSelect });

  const { isPicking, pendingCoordinates, isModalOpen, startPicking, handleMapClick, closeModal } =
    useCreateIncidentFlow();
  useMapClickToPick({ map, enabled: isPicking, onPick: handleMapClick });

  const selectedIncident = incidents.find((incident) => incident.id === selectedIncidentId);

  return (
    <div className={styles.root}>
      <div ref={containerRef} className={styles.map} />
      <div className={styles.filterBar}>
        <FilterBar />
      </div>
      {selectedIncident && (
        <div className={styles.cardOverlay}>
          <IncidentCard incident={selectedIncident} onClose={() => onSelect(null)} />
        </div>
      )}
      <CreateIncidentTrigger isPicking={isPicking} onStart={startPicking} />
      <CreateIncidentModal isOpen={isModalOpen} coordinates={pendingCoordinates} onClose={closeModal} />
    </div>
  );
}
