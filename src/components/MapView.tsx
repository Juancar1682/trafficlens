import { useState } from "react";
import { Map, Marker, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import type { RoadSegment } from "../data/mockSegments";

interface Props {
  segments: RoadSegment[];
  selectedSegment: RoadSegment | null;
  onSelect: (seg: RoadSegment) => void;
}

function markerColor(level: RoadSegment["riskLevel"]) {
  if (level === "high") return "#ff4d4d";
  if (level === "med") return "#ffaa00";
  return "#00ff94";
}

export default function MapView({
  segments,
  selectedSegment,
  onSelect,
}: Props) {
  const [popupOpen, setPopupOpen] = useState(true);

  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      initialViewState={{ longitude: -81.6557, latitude: 30.3322, zoom: 10 }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      style={{ width: "100%", height: "100%" }}
    >
      {segments.map((seg) => {
        const isSelected = selectedSegment?.id === seg.id;
        return (
          <Marker
            key={seg.id}
            longitude={seg.lng}
            latitude={seg.lat}
            onClick={() => {
              onSelect(seg);
              setPopupOpen(true);
            }}
          >
            <div
              style={{
                width: isSelected ? 20 : 12,
                height: isSelected ? 20 : 12,
                borderRadius: "50%",
                background: markerColor(seg.riskLevel),
                border: isSelected ? "2px solid white" : "none",
                boxShadow: isSelected
                  ? `0 0 12px 4px ${markerColor(seg.riskLevel)}`
                  : "none",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            />
          </Marker>
        );
      })}

      {selectedSegment && popupOpen && (
        <Popup
          longitude={selectedSegment.lng}
          latitude={selectedSegment.lat}
          closeOnClick={false}
          onClose={() => setPopupOpen(false)}
          anchor="bottom"
          maxWidth="200px"
        >
          <div
            style={{
              background: "var(--surface2)",
              border: "1px solid var(--border-strong)",
              borderRadius: "10px",
              padding: "12px 12px 10px 12px",
              minWidth: "180px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "13px",
                color: "var(--text)",
                marginBottom: "8px",
                paddingRight: "16px",
              }}
            >
              {selectedSegment.name}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--text-dim)",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <span>
                Speed:{" "}
                <span style={{ color: markerColor(selectedSegment.riskLevel) }}>
                  {selectedSegment.avgSpeed} mph
                </span>{" "}
                / {selectedSegment.speedLimit} limit
              </span>
              <span>
                Risk:{" "}
                <span style={{ color: markerColor(selectedSegment.riskLevel) }}>
                  {selectedSegment.riskScore} / 100
                </span>
              </span>
              <span>Vol: {selectedSegment.volume.toLocaleString()} AADT</span>
            </div>
          </div>
        </Popup>
      )}
    </Map>
  );
}
