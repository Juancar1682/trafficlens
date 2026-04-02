import { useState } from "react";

type TimeFilter = "today" | "week" | "month";

interface TopBarProps {
  activeFilter: TimeFilter;
  onFilterChange: (filter: TimeFilter) => void;
}

export default function TopBar({ activeFilter, onFilterChange }: TopBarProps) {
  const [query, setQuery] = useState("");

  const filters: TimeFilter[] = ["today", "week", "month"];

  return (
    <header
      className="flex items-center justify-between px-6 py-4 sticky top-0 z-40"
      style={{
        borderBottom: "1px solid var(--border)",
        background: "rgba(8,10,13,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      {/* Left — title */}
      <div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "20px",
            letterSpacing: "-0.02em",
            color: "var(--text)",
          }}
        >
          Traffic Overview
        </h1>
        <div
          className="flex items-center gap-2 mt-0.5"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--muted)",
          }}
        >
          <span>Last updated:</span>
          <span style={{ color: "#00ff94" }}>2 min ago</span>
          <span style={{ color: "var(--border-strong)" }}>·</span>
          <span>847 segments indexed</span>
        </div>
      </div>

      {/* Center — AI query bar */}
      <div
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
        style={{
          width: "380px",
          background: "var(--surface2)",
          border: "1px solid rgba(0,255,148,0.2)",
          boxShadow: "0 0 24px rgba(0,255,148,0.06)",
        }}
      >
        {/* AI badge */}
        <div
          className="flex items-center gap-1.5 shrink-0 px-2 py-1 rounded-md"
          style={{
            background: "rgba(0,255,148,0.1)",
            border: "1px solid rgba(0,255,148,0.2)",
          }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#00ff94", boxShadow: "0 0 4px #00ff94" }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "#00ff94",
              letterSpacing: "0.08em",
            }}
          >
            AI
          </span>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask: highest-risk roads on Friday evenings…"
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--text)",
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            flex: 1,
          }}
        />

        {query && (
          <button
            onClick={() => setQuery("")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--muted)",
              padding: 0,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M2 2l9 9M11 2l-9 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}

        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="6" cy="6" r="4" stroke="var(--text)" strokeWidth="1.4" />
          <path
            d="M9.5 9.5L12 12"
            stroke="var(--text)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Right — filters + live badge */}
      <div className="flex items-center gap-2">
        {/* Time filters */}
        <div
          className="flex items-center gap-1 p-1 rounded-xl"
          style={{
            background: "var(--surface2)",
            border: "1px solid var(--border)",
          }}
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className="px-3 py-1.5 rounded-lg text-xs capitalize transition-all duration-150"
              style={{
                fontFamily: "var(--font-mono)",
                background:
                  activeFilter === f ? "var(--surface3)" : "transparent",
                color: activeFilter === f ? "var(--text)" : "var(--muted)",
                border:
                  activeFilter === f
                    ? "1px solid var(--border-strong)"
                    : "1px solid transparent",
                cursor: "pointer",
                letterSpacing: "0.04em",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-5" style={{ background: "var(--border)" }} />

        {/* Live badge */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
          style={{
            background: "rgba(255,77,77,0.08)",
            border: "1px solid rgba(255,77,77,0.2)",
          }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: "#ff4d4d",
              boxShadow: "0 0 6px rgba(255,77,77,0.8)",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "#ff4d4d",
              letterSpacing: "0.1em",
            }}
          >
            LIVE
          </span>
        </div>
      </div>
    </header>
  );
}
