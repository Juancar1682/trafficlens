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
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are a traffic analytics assistant. You will receive a list of road segments as JSON and a user query. 
Return ONLY a valid JSON object with no markdown, no backticks, no explanation outside the JSON.
The JSON must have exactly two fields:
- "filteredIds": an array of segment id strings that match the query
- "explanation": a short one-sentence explanation of what you filtered and why

Segment risk levels: high = riskScore >= 80, med = riskScore >= 60, low = riskScore < 60
Consider speed, volume, riskScore, and riskLevel when filtering.`,
          messages: [
            {
              role: "user",
              content: `Segments: ${JSON.stringify(segments)}
              
Query: "${query}"`,
            },
          ],
        }),
      });

      const data = await response.json();
      const text = data.content[0].text;
      const parsed: AiQueryResult = JSON.parse(text);

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
