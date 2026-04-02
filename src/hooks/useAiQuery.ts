import { useState } from "react";
import type { RoadSegment } from "../data/mockSegments";

interface AiQueryResult {
  filteredIds: string[];
  explanation: string;
}

export function useAiQuery() {
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState("");

  async function runQuery(
    query: string,
    segments: RoadSegment[],
    onResult: (ids: string[]) => void,
  ) {
    setLoading(true);
    setExplanation("");

    try {
      const response = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, segments }),
      });

      const parsed: AiQueryResult = await response.json();
      setExplanation(parsed.explanation);
      onResult(parsed.filteredIds);
    } catch (err) {
      console.error("AI query failed:", err);
      setExplanation("Query failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function clearQuery(onClear: () => void) {
    setExplanation("");
    onClear();
  }

  return { runQuery, clearQuery, loading, explanation };
}
