import { useState } from "react";
import IntakeForm from "../components/IntakeForm";
import ReportView from "../components/ReportView";
import { EmptyState, ScanLoader } from "../components/StatusStates";
import { analyzeMessage } from "../api";

export default function AnalyzerPage() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze(payload) {
    setLoading(true);
    setError("");
    try {
      const result = await analyzeMessage(payload);
      setReport(result);
    } catch (err) {
      setError(err.message || "Analysis failed. Check that the backend is running and reachable.");
      setReport(null);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setReport(null);
    setError("");
  }

  return (
    <div className="workspace">
      <aside className="intake-rail">
        <IntakeForm onAnalyze={handleAnalyze} loading={loading} />
      </aside>
      <main className="case-area">
        {error && <div className="error-banner" style={{ marginBottom: 20 }}>{error}</div>}
        {loading && <ScanLoader />}
        {!loading && !report && <EmptyState />}
        {!loading && report && <ReportView report={report} onReset={reset} />}
      </main>
    </div>
  );
}
