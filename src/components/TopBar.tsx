import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";

type TimeFilter = "today" | "week" | "month";

interface TopBarProps {
  activeFilter: TimeFilter;
  onFilterChange: (filter: TimeFilter) => void;
  onAiQuery: (query: string) => void;
  onAiClear: () => void;
  aiLoading: boolean;
  aiExplanation: string;
}

export default function TopBar({
  activeFilter,
  onFilterChange,
  onAiQuery,
  onAiClear,
  aiLoading,
  aiExplanation,
}: TopBarProps) {
  const [query, setQuery] = useState("");
  const filters: TimeFilter[] = ["today", "week", "month"];

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && query.trim()) {
      onAiQuery(query.trim());
    }
  }

  function handleClear() {
    setQuery("");
    onAiClear();
  }

  return (
    <Box
      as="header"
      px={6}
      py={4}
      position="sticky"
      top={0}
      zIndex={40}
      borderBottom="1px solid var(--border)"
      style={{
        background: "rgba(8,10,13,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <Flex align="center" justify="space-between">
        {/* Left — title */}
        <Box>
          <Text
            fontFamily="var(--font-display)"
            fontWeight={800}
            fontSize="20px"
            letterSpacing="-0.02em"
            color="var(--text)"
          >
            Traffic Overview
          </Text>
          <Flex align="center" gap={2} mt={0.5}>
            <Text
              fontFamily="var(--font-mono)"
              fontSize="11px"
              color="var(--muted)"
            >
              Last updated:
            </Text>
            <Text fontFamily="var(--font-mono)" fontSize="11px" color="#00ff94">
              2 min ago
            </Text>
            <Text
              fontFamily="var(--font-mono)"
              fontSize="11px"
              color="var(--border-strong)"
            >
              ·
            </Text>
            <Text
              fontFamily="var(--font-mono)"
              fontSize="11px"
              color="var(--muted)"
            >
              847 segments indexed
            </Text>
          </Flex>
        </Box>

        {/* Center — AI query bar */}
        <Box w="420px">
          <InputGroup>
            <InputLeftElement pointerEvents="none" h="full" pl={2}>
              <Flex
                align="center"
                gap={1.5}
                px={2}
                py={1}
                borderRadius="md"
                bg="rgba(0,255,148,0.1)"
                border="1px solid rgba(0,255,148,0.2)"
              >
                <Box
                  w="6px"
                  h="6px"
                  borderRadius="full"
                  bg="#00ff94"
                  style={{
                    boxShadow: aiLoading
                      ? "0 0 8px #00ff94"
                      : "0 0 4px #00ff94",
                    animation: aiLoading
                      ? "pulse 0.8s ease-in-out infinite"
                      : "none",
                  }}
                />
                <Text
                  fontFamily="var(--font-mono)"
                  fontSize="10px"
                  color="#00ff94"
                  letterSpacing="0.08em"
                >
                  {aiLoading ? "..." : "AI"}
                </Text>
              </Flex>
            </InputLeftElement>

            <Input
              pl="72px"
              pr={query ? "36px" : "12px"}
              py={2}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask: highest-risk roads on Friday evenings…"
              disabled={aiLoading}
              bg="var(--surface2)"
              border="1px solid"
              borderColor={
                aiLoading
                  ? "rgba(0,255,148,0.5)"
                  : aiExplanation
                    ? "rgba(0,255,148,0.4)"
                    : "rgba(0,255,148,0.2)"
              }
              borderRadius="xl"
              color="var(--text)"
              fontFamily="var(--font-body)"
              fontSize="13px"
              _placeholder={{ color: "var(--muted)" }}
              _hover={{ borderColor: "rgba(0,255,148,0.4)" }}
              _focus={{
                borderColor: "rgba(0,255,148,0.6)",
                boxShadow: "0 0 0 1px rgba(0,255,148,0.3)",
              }}
              transition="all 0.3s"
            />

            {/* Clear button */}
            {(query || aiExplanation) && !aiLoading && (
              <Box
                position="absolute"
                right={3}
                top="50%"
                transform="translateY(-50%)"
                zIndex={1}
              >
                <IconButton
                  aria-label="Clear query"
                  size="xs"
                  variant="ghost"
                  onClick={handleClear}
                  color="var(--muted)"
                  _hover={{ color: "var(--text)", bg: "transparent" }}
                  icon={
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path
                        d="M2 2l9 9M11 2l-9 9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  }
                />
              </Box>
            )}
          </InputGroup>

          {/* AI explanation */}
          {aiExplanation && !aiLoading && (
            <Box
              mt={1.5}
              px={3}
              py={1.5}
              borderRadius="lg"
              fontFamily="var(--font-mono)"
              fontSize="11px"
              color="#00ff94"
              bg="rgba(0,255,148,0.06)"
              border="1px solid rgba(0,255,148,0.15)"
            >
              ✦ {aiExplanation}
            </Box>
          )}
        </Box>

        {/* Right — filters + live badge */}
        <Flex align="center" gap={2}>
          {/* Time filters */}
          <ButtonGroup
            size="sm"
            isAttached
            variant="ghost"
            p={1}
            borderRadius="xl"
            bg="var(--surface2)"
            border="1px solid var(--border)"
          >
            {filters.map((f) => (
              <Button
                key={f}
                onClick={() => onFilterChange(f)}
                fontFamily="var(--font-mono)"
                fontSize="11px"
                letterSpacing="0.04em"
                textTransform="capitalize"
                borderRadius="lg"
                color={activeFilter === f ? "var(--text)" : "var(--muted)"}
                bg={activeFilter === f ? "var(--surface3)" : "transparent"}
                border={
                  activeFilter === f
                    ? "1px solid var(--border-strong)"
                    : "1px solid transparent"
                }
                _hover={{ bg: "var(--surface3)", color: "var(--text)" }}
                transition="all 0.15s"
              >
                {f}
              </Button>
            ))}
          </ButtonGroup>

          {/* Divider */}
          <Box w="1px" h="20px" bg="var(--border)" />

          {/* Live badge */}
          <Flex
            align="center"
            gap={2}
            px={3}
            py={1.5}
            borderRadius="lg"
            bg="rgba(255,77,77,0.08)"
            border="1px solid rgba(255,77,77,0.2)"
          >
            <Box
              w="6px"
              h="6px"
              borderRadius="full"
              bg="#ff4d4d"
              style={{
                boxShadow: "0 0 6px rgba(255,77,77,0.8)",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            <Text
              fontFamily="var(--font-mono)"
              fontSize="11px"
              color="#ff4d4d"
              letterSpacing="0.1em"
            >
              LIVE
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
