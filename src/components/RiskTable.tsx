import { Box, Flex, Text, Badge } from "@chakra-ui/react";
import type { RoadSegment } from "../data/mockSegments";

interface Props {
  segments: RoadSegment[];
  selectedSegment: RoadSegment | null;
  onSelect: (seg: RoadSegment) => void;
}

function riskColor(score: number) {
  if (score >= 80) return "#ff4d4d";
  if (score >= 60) return "#ffaa00";
  return "#00ff94";
}

function riskDim(score: number) {
  if (score >= 80) return "rgba(255,77,77,0.12)";
  if (score >= 60) return "rgba(255,170,0,0.12)";
  return "rgba(0,255,148,0.12)";
}

export default function RiskTable({
  segments,
  selectedSegment,
  onSelect,
}: Props) {
  const sorted = [...segments].sort((a, b) => b.riskScore - a.riskScore);

  return (
    <Box
      borderRadius="2xl"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      height="100%"
      bg="var(--surface)"
      border="1px solid var(--border)"
    >
      {/* Header */}
      <Flex
        align="center"
        justify="space-between"
        px={4}
        py={3}
        borderBottom="1px solid var(--border)"
      >
        <Text
          fontFamily="var(--font-display)"
          fontWeight={700}
          fontSize="14px"
          color="var(--text)"
        >
          Risk Rankings
        </Text>
        <Badge
          px={2}
          py={0.5}
          borderRadius="md"
          fontFamily="var(--font-mono)"
          fontSize="11px"
          color="#ff4d4d"
          bg="rgba(255,77,77,0.1)"
          border="1px solid rgba(255,77,77,0.2)"
        >
          {segments.filter((s) => s.riskScore >= 80).length} critical
        </Badge>
      </Flex>

      {/* Rows */}
      <Box flex={1} overflowY="auto">
        {sorted.map((seg, index) => {
          const isSelected = selectedSegment?.id === seg.id;
          const color = riskColor(seg.riskScore);
          const dim = riskDim(seg.riskScore);

          return (
            <Flex
              key={seg.id}
              align="center"
              gap={3}
              px={4}
              py={3}
              cursor="pointer"
              borderBottom="1px solid var(--border)"
              borderLeft={
                isSelected ? `2px solid ${color}` : "2px solid transparent"
              }
              bg={isSelected ? "var(--surface2)" : "transparent"}
              _hover={{ bg: "var(--surface2)" }}
              transition="all 0.15s"
              onClick={() => onSelect(seg)}
            >
              {/* Rank */}
              <Text
                fontFamily="var(--font-mono)"
                fontSize="11px"
                color="var(--muted)"
                w="16px"
                flexShrink={0}
              >
                {index + 1}
              </Text>

              {/* Name + stats */}
              <Box flex={1} minW={0}>
                <Text
                  fontFamily="var(--font-display)"
                  fontWeight={600}
                  fontSize="13px"
                  color="var(--text)"
                  noOfLines={1}
                >
                  {seg.name}
                </Text>
                <Text
                  fontFamily="var(--font-mono)"
                  fontSize="10px"
                  color="var(--muted)"
                  mt="2px"
                >
                  {seg.avgSpeed} mph · {seg.volume.toLocaleString()} AADT
                </Text>
              </Box>

              {/* Risk badge */}
              <Badge
                px={2}
                py={1}
                borderRadius="lg"
                fontFamily="var(--font-mono)"
                fontSize="12px"
                fontWeight={500}
                color={color}
                bg={dim}
                border={`1px solid ${color}33`}
                minW="36px"
                textAlign="center"
                flexShrink={0}
              >
                {seg.riskScore}
              </Badge>
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
}
