import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { hourlyVolume } from "../data/mockHourly";

type TimeFilter = "today" | "week" | "month";

interface Props {
  activeFilter: TimeFilter;
}

function barColor(volume: number) {
  if (volume > 7000) return "#ff4d4d";
  if (volume > 5000) return "#ffaa00";
  return "#4d9fff";
}

const hours = [
  "12a",
  "1a",
  "2a",
  "3a",
  "4a",
  "5a",
  "6a",
  "7a",
  "8a",
  "9a",
  "10a",
  "11a",
  "12p",
  "1p",
  "2p",
  "3p",
  "4p",
  "5p",
  "6p",
  "7p",
  "8p",
  "9p",
  "10p",
  "11p",
];

export default function VolumeChart({ activeFilter }: Props) {
  const data = hourlyVolume[activeFilter];

  const options: ApexOptions = {
    chart: {
      type: "bar",
      background: "transparent",
      toolbar: { show: false },
      animations: { enabled: true },
    },
    plotOptions: {
      bar: {
        borderRadius: 3,
        columnWidth: "70%",
        distributed: true,
      },
    },
    colors: data.map(barColor),
    dataLabels: { enabled: false },
    legend: { show: false },
    xaxis: {
      categories: hours,
      labels: {
        style: {
          colors: Array(24).fill("#475569"),
          fontFamily: "IBM Plex Mono",
          fontSize: "10px",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: {
          colors: ["#475569"],
          fontFamily: "IBM Plex Mono",
          fontSize: "10px",
        },
        formatter: (val) => `${(val / 1000).toFixed(0)}k`,
      },
    },
    grid: {
      borderColor: "rgba(255,255,255,0.06)",
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
    },
    tooltip: {
      theme: "dark",
      style: { fontFamily: "IBM Plex Mono", fontSize: "12px" },
      y: { formatter: (val) => `${val.toLocaleString()} vehicles` },
    },
    theme: { mode: "dark" },
  };

  return (
    <div
      className="rounded-2xl p-5 flex flex-col"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "14px",
              color: "var(--text)",
            }}
          >
            Hourly Traffic Volume
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--muted)",
              marginTop: "2px",
            }}
          >
            Vehicles per hour · All corridors · {activeFilter}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {[
            { label: "Peak >7k", color: "#ff4d4d" },
            { label: "High >5k", color: "#ffaa00" },
            { label: "Normal", color: "#4d9fff" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-sm"
                style={{ background: item.color }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "var(--muted)",
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <ReactApexChart
        type="bar"
        series={[{ name: "Vehicles", data }]}
        options={options}
        height={200}
      />
    </div>
  );
}
