const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function handle(res) {
  const contentType = res.headers.get("content-type") || "";
  const payload = contentType.includes("application/json") ? await res.json() : await res.text();
  if (!res.ok) {
    const message = (payload && payload.error) || "Request failed";
    const details = (payload && payload.details) || [];
    const err = new Error(Array.isArray(details) && details.length ? `${message}: ${details.join(" ")}` : message);
    err.status = res.status;
    throw err;
  }
  return payload;
}

export async function analyzeMessage(input) {
  const res = await fetch(`${API_URL}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });
  return handle(res);
}

export async function getReport(id) {
  const res = await fetch(`${API_URL}/api/report/${id}`);
  return handle(res);
}

export function exportUrl(id) {
  return `${API_URL}/api/report/${id}/export`;
}

export { API_URL };
