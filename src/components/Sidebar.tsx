import React, { useState } from "react";

interface NavItemProps {
  label: string;
  active?: boolean;
  icon: React.ReactNode;
  onClick?: () => void;
}

function NavItem({ label, active, icon, onClick }: NavItemProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex items-center gap-3 mx-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm transition-all duration-150"
      style={{
        background: active
          ? "rgba(0,255,148,0.08)"
          : hovered
            ? "rgba(255,255,255,0.04)"
            : "transparent",
        color: active ? "#00ff94" : hovered ? "var(--text)" : "var(--muted)",
        fontFamily: "var(--font-body)",
        fontWeight: active ? 500 : 400,
        borderLeft: active ? "2px solid #00ff94" : "2px solid transparent",
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{ opacity: active ? 1 : 0.6 }}>{icon}</span>
      {label}
      {active && (
        <div
          className="ml-auto w-1 h-1 rounded-full"
          style={{ background: "#00ff94" }}
        />
      )}
    </div>
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
    <aside
      className="fixed left-0 top-0 flex flex-col"
      style={{
        width: "256px",
        height: "100vh",
        background: "var(--surface)",
        borderRight: "1px solid var(--border)",
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-5 py-5"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{
            background: "linear-gradient(135deg, #00ff94 0%, #4d9fff 100%)",
            boxShadow: "0 0 16px rgba(0,255,148,0.3)",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path
              d="M2 13L5.5 6 9 9.5 13 2"
              stroke="#080a0d"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="13" cy="2" r="1.8" fill="#080a0d" />
          </svg>
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "15px",
              letterSpacing: "0.08em",
              color: "var(--text)",
            }}
          >
            TRAFFICLENS
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            v1.0 · <span style={{ color: "#00ff94" }}>LIVE</span>
          </div>
        </div>
      </div>

      {/* Region */}
      <div
        className="px-4 py-3"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div
          className="text-xs mb-2 tracking-widest uppercase"
          style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}
        >
          Active Region
        </div>
        <div
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
          style={{
            background: "var(--surface2)",
            border: "1px solid var(--border-strong)",
            cursor: "pointer",
          }}
        >
          <div
            className="w-2 h-2 rounded-full shrink-0"
            style={{
              background: "#00ff94",
              boxShadow: "0 0 6px rgba(0,255,148,0.6)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "13px",
              color: "var(--text)",
            }}
          >
            Jacksonville, FL
          </span>
          <svg
            className="ml-auto"
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
          >
            <path
              d="M2.5 4.5l3 3 3-3"
              stroke="var(--muted)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 flex flex-col gap-0.5">
        <div
          className="px-4 mb-1 text-xs tracking-widest uppercase"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--muted)",
            opacity: 0.6,
          }}
        >
          Analytics
        </div>
        {analyticsNav.map((item) => (
          <NavItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            active={activeNav === item.label}
            onClick={() => setActiveNav(item.label)}
          />
        ))}

        <div
          className="px-4 mt-4 mb-1 text-xs tracking-widest uppercase"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--muted)",
            opacity: 0.6,
          }}
        >
          Reports
        </div>
        {reportsNav.map((item) => (
          <NavItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            active={activeNav === item.label}
            onClick={() => setActiveNav(item.label)}
          />
        ))}
      </nav>

      {/* User */}
      <div
        className="flex items-center gap-3 px-4 py-4"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0"
          style={{
            background: "linear-gradient(135deg, #00ff94, #4d9fff)",
            color: "#080a0d",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
          }}
        >
          JC
        </div>
        <div className="flex-1 min-w-0">
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "13px",
              color: "var(--text)",
            }}
          >
            Juan C.
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--muted)",
            }}
          >
            Traffic Engineer
          </div>
        </div>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="5" r="2" stroke="var(--muted)" strokeWidth="1.3" />
          <path
            d="M2 12c0-2.8 2.2-4.5 5-4.5s5 1.7 5 4.5"
            stroke="var(--muted)"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </aside>
  );
}
