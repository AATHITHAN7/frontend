const COLOR_BY_RISK = {
  critical: "var(--critical)",
  high: "var(--high)",
  medium: "var(--medium)",
  low: "var(--low)"
};

export default function ThreatGauge({ score, riskLevel, summary }) {
  const color = COLOR_BY_RISK[riskLevel] || "var(--accent-500)";
  return (
    <div className="gauge-block" style={{ "--stamp-color": color }}>
      <div className="gauge-top">
        <div className="gauge-score">
          {score}
          <span>/100 risk score</span>
        </div>
        <div className="gauge-label">{summary}</div>
      </div>
      <div className="gauge-track">
        <div className="gauge-fill" style={{ width: `${score}%` }} />
      </div>
      <div className="gauge-ticks">
        <span>0 — safe</span>
        <span>20 — suspicious</span>
        <span>45 — likely phishing</span>
        <span>70 — confirmed</span>
      </div>
    </div>
  );
}
