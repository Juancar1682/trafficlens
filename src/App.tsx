import { useState } from "react";
import KpiCard from "./components/KpiCard";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import MapView from "./components/MapView";
import RiskTable from "./components/RiskTable";
import SpeedGauge from "./components/SpeedGauge";
import VolumeChart from "./components/VolumeChart";
import HeatmapChart from "./components/HeatmapChart";
import { mockSegments } from "./data/mockSegments";
import { useAiQuery } from "./hooks/useAiQuery";
import type { RoadSegment } from "./data/mockSegments";

type TimeFilter = "today" | "week" | "month";

export default function App() {
  const [activeFilter, setActiveFilter] = useState<TimeFilter>("today");
  const [selectedSegment, setSelectedSegment] = useState<RoadSegment | null>(
    null,
  );
  const [filteredIds, setFilteredIds] = useState<string[] | null>(null);

  const { runQuery, clearQuery, loading, explanation } = useAiQuery();

  const visibleSegments = filteredIds
    ? mockSegments.filter((s) => filteredIds.includes(s.id))
    : mockSegments;

  function handleAiQuery(query: string) {
    runQuery(query, mockSegments, (ids) => {
      setFilteredIds(ids);
      setSelectedSegment(null);
    });
  }

  function handleAiClear() {
    clearQuery(() => {
      setFilteredIds(null);
      setSelectedSegment(null);
    });
  }

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ marginLeft: "256px" }}>
        <TopBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          onAiQuery={handleAiQuery}
          onAiClear={handleAiClear}
          aiLoading={loading}
          aiExplanation={explanation}
        />
        <main className="p-6 flex flex-col gap-6">
          {/* KPI Row */}
          <div className="grid grid-cols-4 gap-4">
            <KpiCard
              label="AVG NETWORK SPEED"
              value="38.4"
              unit="mph"
              delta="+2.1 mph"
              deltaPositive={true}
              accent="green"
              sparkPoints={[20, 16, 18, 10, 14, 8, 12, 6, 9]}
            />
            <KpiCard
              label="HIGH-RISK SEGMENTS"
              value="23"
              unit="roads"
              delta="+3"
              deltaPositive={false}
              accent="red"
              sparkPoints={[14, 18, 12, 20, 16, 22, 18, 24, 20]}
            />
            <KpiCard
              label="DAILY VEHICLE MILES"
              value="4.2M"
              unit="VMT"
              delta="+0.3M"
              deltaPositive={true}
              accent="yellow"
              sparkPoints={[18, 14, 16, 12, 15, 10, 13, 9, 11]}
            />
            <KpiCard
              label="CONGESTION INDEX"
              value="0.74"
              unit="/ 1.0"
              delta="+0.06"
              deltaPositive={false}
              accent="blue"
              sparkPoints={[22, 20, 18, 14, 10, 6, 10, 14, 18]}
            />
          </div>

          {/* Map + Right Column */}
          <div className="flex gap-4" style={{ height: "460px" }}>
            <div
              className="flex-1 rounded-2xl overflow-hidden"
              style={{ border: "1px solid var(--border)" }}
            >
              <MapView
                segments={visibleSegments}
                selectedSegment={selectedSegment}
                onSelect={setSelectedSegment}
              />
            </div>
            <div
              style={{
                width: "300px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <SpeedGauge
                avgSpeed={selectedSegment?.avgSpeed ?? 0}
                speedLimit={selectedSegment?.speedLimit ?? 45}
                segmentName={
                  selectedSegment?.name ?? "Select a segment on the map"
                }
              />
              <div style={{ flex: 1, minHeight: 0 }}>
                <RiskTable
                  segments={visibleSegments}
                  selectedSegment={selectedSegment}
                  onSelect={setSelectedSegment}
                />
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-2 gap-4">
            <VolumeChart activeFilter={activeFilter} />
            <HeatmapChart activeFilter={activeFilter} />
          </div>
        </main>
      </div>
    </div>
  );
}
