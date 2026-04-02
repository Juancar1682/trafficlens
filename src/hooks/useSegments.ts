import { useState } from "react";
import { mockSegments } from "../data/mockSegments";
import type { RoadSegment } from "../data/mockSegments";

export type TimeFilter = "today" | "week" | "month";
export type ActiveLayer = "risk" | "speed" | "volume";

export function useSegments() {
  const [selectedSegment, setSelectedSegment] = useState<RoadSegment>(
    mockSegments[0]
  );
  const [activeFilter, setActiveFilter] = useState<TimeFilter>("today");
  const [activeLayer, setActiveLayer] = useState<ActiveLayer>("risk");

  return {
    segments: mockSegments,
    selectedSegment,
    setSelectedSegment,
    activeFilter,
    setActiveFilter,
    activeLayer,
    setActiveLayer,
  };
}
