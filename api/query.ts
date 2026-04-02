export const config = { runtime: "edge" };

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { query, segments } = await req.json();

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
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
            content: `Segments: ${JSON.stringify(segments)}\n\nQuery: "${query}"`,
          },
        ],
      }),
    });

    const data = await response.json();
    const text = data.content[0].text;

    return new Response(text, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("API route error:", err);
    return new Response(JSON.stringify({ error: "Query failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
