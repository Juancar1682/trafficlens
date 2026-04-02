export type RiskLevel = "high" | "med" | "low";

export interface RoadSegment {
  id: string;
  name: string;
  lat: number;
  lng: number;
  avgSpeed: number;
  speedLimit: number;
  volume: number;
  riskScore: number;
  riskLevel: RiskLevel;
}

export const mockSegments: RoadSegment[] = [
  {
    id: "seg-1",
    name: "I-95 @ Lem Turner",
    lat: 30.4003,
    lng: -81.6542,
    avgSpeed: 72,
    speedLimit: 65,
    volume: 8420,
    riskScore: 88,
    riskLevel: "high",
  },
  {
    id: "seg-2",
    name: "Beach Blvd / US-90",
    lat: 30.2961,
    lng: -81.5624,
    avgSpeed: 41,
    speedLimit: 45,
    volume: 6750,
    riskScore: 76,
    riskLevel: "high",
  },
  {
    id: "seg-3",
    name: "Atlantic Blvd @ University",
    lat: 30.3308,
    lng: -81.5997,
    avgSpeed: 49,
    speedLimit: 45,
    volume: 5980,
    riskScore: 67,
    riskLevel: "med",
  },
  {
    id: "seg-4",
    name: "Blanding Blvd / SR-21",
    lat: 30.1872,
    lng: -81.7558,
    avgSpeed: 38,
    speedLimit: 45,
    volume: 4310,
    riskScore: 54,
    riskLevel: "med",
  },
  {
    id: "seg-5",
    name: "Philips Hwy / US-1 S",
    lat: 30.2604,
    lng: -81.5803,
    avgSpeed: 55,
    speedLimit: 55,
    volume: 7120,
    riskScore: 82,
    riskLevel: "high",
  },
  {
    id: "seg-6",
    name: "University Blvd N",
    lat: 30.3572,
    lng: -81.6128,
    avgSpeed: 33,
    speedLimit: 40,
    volume: 3870,
    riskScore: 48,
    riskLevel: "low",
  },
  {
    id: "seg-7",
    name: "Baymeadows Rd @ I-95",
    lat: 30.2453,
    lng: -81.5891,
    avgSpeed: 44,
    speedLimit: 45,
    volume: 5560,
    riskScore: 61,
    riskLevel: "med",
  },
  {
    id: "seg-8",
    name: "I-10 @ Cassat Ave",
    lat: 30.3214,
    lng: -81.7321,
    avgSpeed: 62,
    speedLimit: 65,
    volume: 9100,
    riskScore: 43,
    riskLevel: "low",
  },
];
