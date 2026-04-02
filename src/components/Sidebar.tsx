import React, { useState } from "react";
import { Box, Flex, Text, Divider } from "@chakra-ui/react";

interface NavItemProps {
  label: string;
  active?: boolean;
  icon: React.ReactNode;
  onClick?: () => void;
}

function NavItem({ label, active, icon, onClick }: NavItemProps) {
  return (
    <Flex
      align="center"
      gap={3}
      mx={3}
      px={3}
      py={2}
      borderRadius="xl"
      cursor="pointer"
      fontSize="sm"
      transition="all 0.15s"
      fontFamily="var(--font-body)"
      fontWeight={active ? 500 : 400}
      color={active ? "#00ff94" : "var(--muted)"}
      bg={active ? "rgba(0,255,148,0.08)" : "transparent"}
      borderLeft={active ? "2px solid #00ff94" : "2px solid transparent"}
      _hover={{
        bg: active ? "rgba(0,255,148,0.08)" : "rgba(255,255,255,0.04)",
        color: active ? "#00ff94" : "var(--text)",
      }}
      onClick={onClick}
    >
      <Box opacity={active ? 1 : 0.6}>{icon}</Box>
      {label}
      {active && (
        <Box ml="auto" w="6px" h="6px" borderRadius="full" bg="#00ff94" />
      )}
    </Flex>
  );
}

export default function Sidebar() {
  const [activeNav, setActiveNav] = useState("Overview");

  const analyticsNav = [
    {
      label: "Overview",
      icon: (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <rect
            x="1"
            y="8"
            width="3"
            height="6"
            rx="0.5"
            fill="currentColor"
            opacity=".5"
          />
          <rect
            x="6"
            y="5"
            width="3"
            height="9"
            rx="0.5"
            fill="currentColor"
            opacity=".8"
          />
          <rect
            x="11"
            y="1"
            width="3"
            height="13"
            rx="0.5"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      label: "Speed Analysis",
      icon: (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <circle
            cx="7.5"
            cy="7.5"
            r="5.5"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <path
            d="M7.5 4v3.5l2.5 1.5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Traffic Volume",
      icon: (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path
            d="M1 11L4.5 7 7.5 9.5 11 5 14 7"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="14" cy="7" r="1.2" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: "Collision Risk",
      icon: (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path
            d="M7.5 2L9.5 6.5H13.5L10.5 9l1 4-4-2.5-4 2.5 1-4L1.5 6.5H5.5L7.5 2z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Heat Maps",
      icon: (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <rect
            x="1.5"
            y="1.5"
            width="5"
            height="5"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <rect
            x="8.5"
            y="1.5"
            width="5"
            height="5"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <rect
            x="1.5"
            y="8.5"
            width="5"
            height="5"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <rect
            x="8.5"
            y="8.5"
            width="5"
            height="5"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.3"
          />
        </svg>
      ),
    },
  ];

  const reportsNav = [
    {
      label: "Monthly Reports",
      icon: (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <rect
            x="2.5"
            y="1"
            width="10"
            height="13"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <path
            d="M5 5h5M5 7.5h5M5 10h3"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Compare Corridors",
      icon: (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path
            d="M7.5 1v13M1 7.5h13"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      display="flex"
      flexDirection="column"
      w="256px"
      h="100vh"
      bg="var(--surface)"
      borderRight="1px solid var(--border)"
      zIndex={50}
    >
      {/* Logo */}
      <Flex
        align="center"
        gap={3}
        px={5}
        py={5}
        borderBottom="1px solid var(--border)"
      >
        <Box>
          <Text
            fontFamily="var(--font-display)"
            fontWeight={700}
            fontSize="15px"
            letterSpacing="0.08em"
            color="var(--text)"
          >
            TRAFFICLENS
          </Text>
          <Text
            fontFamily="var(--font-mono)"
            fontSize="10px"
            color="var(--muted)"
            letterSpacing="0.05em"
          >
            v1.0 ·{" "}
            <Box as="span" color="#00ff94">
              LIVE
            </Box>
          </Text>
        </Box>
      </Flex>

      {/* Region */}
      <Box px={4} py={3} borderBottom="1px solid var(--border)">
        <Text
          fontFamily="var(--font-mono)"
          fontSize="10px"
          color="var(--muted)"
          letterSpacing="0.08em"
          textTransform="uppercase"
          mb={2}
        >
          Active Region
        </Text>
        <Flex
          align="center"
          gap={2}
          px={3}
          py={2}
          borderRadius="lg"
          cursor="pointer"
          bg="var(--surface2)"
          border="1px solid var(--border-strong)"
          _hover={{ borderColor: "rgba(0,255,148,0.3)" }}
          transition="all 0.2s"
        >
          <Box
            w="8px"
            h="8px"
            borderRadius="full"
            flexShrink={0}
            style={{
              background: "#00ff94",
              boxShadow: "0 0 6px rgba(0,255,148,0.6)",
            }}
          />
          <Text
            fontFamily="var(--font-display)"
            fontWeight={600}
            fontSize="13px"
            color="var(--text)"
          >
            Jacksonville, FL
          </Text>
          <Box ml="auto">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path
                d="M2.5 4.5l3 3 3-3"
                stroke="var(--muted)"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </Box>
        </Flex>
      </Box>

      {/* Nav */}
      <Box
        flex={1}
        overflowY="auto"
        py={3}
        display="flex"
        flexDirection="column"
        gap={0.5}
      >
        <Text
          px={4}
          mb={1}
          fontFamily="var(--font-mono)"
          fontSize="10px"
          color="var(--muted)"
          letterSpacing="0.08em"
          textTransform="uppercase"
          opacity={0.6}
        >
          Analytics
        </Text>

        {analyticsNav.map((item) => (
          <NavItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            active={activeNav === item.label}
            onClick={() => setActiveNav(item.label)}
          />
        ))}

        <Text
          px={4}
          mt={4}
          mb={1}
          fontFamily="var(--font-mono)"
          fontSize="10px"
          color="var(--muted)"
          letterSpacing="0.08em"
          textTransform="uppercase"
          opacity={0.6}
        >
          Reports
        </Text>

        {reportsNav.map((item) => (
          <NavItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            active={activeNav === item.label}
            onClick={() => setActiveNav(item.label)}
          />
        ))}
      </Box>

      <Divider borderColor="var(--border)" />

      {/* User */}
      <Flex align="center" gap={3} px={4} py={4}>
        <Box
          w="32px"
          h="32px"
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="12px"
          flexShrink={0}
          style={{
            background: "linear-gradient(135deg, #00ff94, #4d9fff)",
            color: "#080a0d",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
          }}
        >
          JC
        </Box>
        <Box flex={1} minW={0}>
          <Text
            fontFamily="var(--font-display)"
            fontWeight={600}
            fontSize="13px"
            color="var(--text)"
          >
            Juan C.
          </Text>
          <Text
            fontFamily="var(--font-mono)"
            fontSize="10px"
            color="var(--muted)"
          >
            Traffic Engineer
          </Text>
        </Box>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="5" r="2" stroke="var(--muted)" strokeWidth="1.3" />
          <path
            d="M2 12c0-2.8 2.2-4.5 5-4.5s5 1.7 5 4.5"
            stroke="var(--muted)"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      </Flex>
    </Box>
  );
}
