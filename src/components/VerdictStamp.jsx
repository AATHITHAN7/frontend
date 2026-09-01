const COLOR_BY_RISK = {
  critical: "var(--critical)",
  high: "var(--high)",
  medium: "var(--medium)",
  low: "var(--low)"
};

export default function VerdictStamp({ verdict, riskLevel }) {
  return (
    <div className="stamp-wrap">
      <div
        className="verdict-stamp"
        style={{ "--stamp-color": COLOR_BY_RISK[riskLevel] || "var(--muted-500)" }}
      >
        {verdict}
      </div>
    </div>
  );
}
