import { useState } from "react";
import type { Coordinates } from "@/entities/incident";

export function useCreateIncidentFlow() {
  const [isPicking, setIsPicking] = useState(false);
  const [pendingCoordinates, setPendingCoordinates] = useState<Coordinates | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const startPicking = () => setIsPicking(true);

  const handleMapClick = (coordinates: Coordinates) => {
    setPendingCoordinates(coordinates);
    setIsPicking(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPendingCoordinates(null);
  };

  return {
    isPicking,
    pendingCoordinates,
    isModalOpen,
    startPicking,
    handleMapClick,
    closeModal,
  };
}
