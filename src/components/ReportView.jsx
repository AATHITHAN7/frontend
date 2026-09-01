import VerdictStamp from "./VerdictStamp";
import ThreatGauge from "./ThreatGauge";
import IndicatorList from "./IndicatorList";
import IOCPanel from "./IOCPanel";
import ActionPlan from "./ActionPlan";
import ShareBar from "./ShareBar";

export default function ReportView({ report, onReset, readOnly = false }) {
  const { input } = report;
  return (
    <div>
      <div className="case-header">
        <div>
          <div className="case-id mono">CASE #{report.id.slice(0, 8).toUpperCase()} — {new Date(report.generatedAt).toLocaleString()}</div>
          <div className="case-subject">{input.subject || "(no subject line)"}</div>
          <div className="case-from">
            From <span className="mono">{input.senderName ? `${input.senderName} <${input.senderEmail}>` : input.senderEmail}</span>
          </div>
        </div>
        <VerdictStamp verdict={report.verdict} riskLevel={report.riskLevel} />
      </div>

      <ThreatGauge score={report.score} riskLevel={report.riskLevel} summary={report.verdictSummary} />

      <div className="narrative-block">{report.narrative}</div>

      <IndicatorList indicators={report.indicators} />
      <IOCPanel iocs={report.iocs} />
      <ActionPlan actions={report.recommendedActions} />

      {!readOnly && <ShareBar reportId={report.id} onReset={onReset} />}
    </div>
  );
}
