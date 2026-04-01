import KpiCard from "./components/KpiCard";

export default function App() {
  return (
    <div
      style={{ background: "var(--bg)", minHeight: "100vh", padding: "2rem" }}
    >
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
    </div>
  );
}
