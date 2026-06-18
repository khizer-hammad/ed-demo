// Vercel serverless function (Node). Holds your Gemini key (env var) — the browser never sees it.
// Returns { content:[{type:"text",text}] } so the page works unchanged.
const MODEL = "gemini-2.5-flash";   // change to another Gemini model your key supports if needed
const MAX_TOKENS = 2048;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "Missing GEMINI_API_KEY env var on Vercel." });
  }
  try {
    const { system, messages } = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});

    const contents = (messages || []).map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: typeof m.content === "string" ? m.content : String(m.content) }]
    }));

    const body = {
      systemInstruction: { parts: [{ text: system || "" }] },
      contents,
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: MAX_TOKENS,
        thinkingConfig: { thinkingBudget: 0 }
      }
    };

    const r = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/" + MODEL + ":generateContent",
      { method: "POST",
        headers: { "content-type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
        body: JSON.stringify(body) }
    );
    const data = await r.json();

    if (!r.ok) return res.status(r.status).json({ content: [{ type: "text", text: "" }], error: data });

    const parts = data?.candidates?.[0]?.content?.parts || [];
    const text = parts.map(p => p.text || "").join("").trim();
    return res.status(200).json({ content: [{ type: "text", text }] });
  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }
}
