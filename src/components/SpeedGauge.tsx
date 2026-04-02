import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { Box, Flex, Text } from "@chakra-ui/react";

interface Props {
  avgSpeed: number;
  speedLimit: number;
  segmentName: string;
}

function gaugeColor(avgSpeed: number, speedLimit: number) {
  if (avgSpeed > speedLimit) return "#ff4d4d";
  if (avgSpeed >= speedLimit - 5) return "#ffaa00";
  return "#00ff94";
}

export default function SpeedGauge({
  avgSpeed,
  speedLimit,
  segmentName,
}: Props) {
  if (!avgSpeed) {
    return (
      <Box
        borderRadius="2xl"
        p={5}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minH="180px"
        gap={2}
        bg="var(--surface)"
        border="1px solid var(--border)"
      >
        <Text
          fontFamily="var(--font-display)"
          fontWeight={700}
          fontSize="14px"
          color="var(--text)"
        >
          Speed Gauge
        </Text>
        <Text
          fontFamily="var(--font-mono)"
          fontSize="11px"
          color="var(--muted)"
          textAlign="center"
        >
          Click a marker on the map
          <br />
          or a row in the table
        </Text>
      </Box>
    );
  }

  const color = gaugeColor(avgSpeed, speedLimit);
  const percentage = Math.min(
    Math.round((avgSpeed / (speedLimit + 20)) * 100),
    100,
  );

  const options: ApexOptions = {
    chart: {
      type: "radialBar",
      background: "transparent",
      toolbar: { show: false },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: { size: "60%" },
        track: {
          background: "rgba(255,255,255,0.05)",
          strokeWidth: "100%",
        },
        dataLabels: {
          name: {
            show: true,
            offsetY: 20,
            color: "var(--muted)",
            fontFamily: "IBM Plex Mono",
            fontSize: "11px",
          },
          value: {
            show: true,
            offsetY: -10,
            color,
            fontFamily: "Bricolage Grotesque",
            fontSize: "32px",
            fontWeight: 800,
            formatter: () => `${avgSpeed}`,
          },
        },
      },
    },
    fill: { type: "solid", colors: [color] },
    stroke: { lineCap: "round" },
    labels: [`limit ${speedLimit} mph`],
    theme: { mode: "dark" },
  };

  const stats = [
    { label: "Avg Speed", value: `${avgSpeed}`, unit: "mph", color },
    {
      label: "Speed Limit",
      value: `${speedLimit}`,
      unit: "mph",
      color: "var(--text)",
    },
    {
      label: "Over Limit",
      value: avgSpeed > speedLimit ? `+${avgSpeed - speedLimit}` : "OK",
      unit: avgSpeed > speedLimit ? "mph" : "",
      color: avgSpeed > speedLimit ? "#ff4d4d" : "#00ff94",
    },
  ];

  return (
    <Box
      borderRadius="2xl"
      p={4}
      display="flex"
      flexDirection="column"
      bg="var(--surface)"
      border="1px solid var(--border)"
    >
      {/* Header */}
      <Text
        fontFamily="var(--font-display)"
        fontWeight={700}
        fontSize="14px"
        color="var(--text)"
        mb={1}
      >
        Speed Gauge
      </Text>
      <Text
        fontFamily="var(--font-mono)"
        fontSize="11px"
        color="var(--muted)"
        mb={2}
        noOfLines={1}
      >
        {segmentName}
      </Text>

      {/* Chart */}
      <ReactApexChart
        type="radialBar"
        series={[percentage]}
        options={options}
        height={220}
      />

      {/* Stats row */}
      <Flex gap={2} mt={2} pt={3} borderTop="1px solid var(--border)">
        {stats.map((stat) => (
          <Box key={stat.label} flex={1} textAlign="center">
            <Text
              fontFamily="var(--font-mono)"
              fontSize="10px"
              color="var(--muted)"
              mb="2px"
            >
              {stat.label}
            </Text>
            <Text
              fontFamily="var(--font-display)"
              fontWeight={700}
              fontSize="16px"
              color={stat.color}
            >
              {stat.value}
              <Text
                as="span"
                fontFamily="var(--font-mono)"
                fontSize="10px"
                color="var(--muted)"
                ml="2px"
              >
                {stat.unit}
              </Text>
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
