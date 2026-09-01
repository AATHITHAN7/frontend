import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReportView from "../components/ReportView";
import { ScanLoader } from "../components/StatusStates";
import { getReport } from "../api";

export default function SharedReportPage() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    getReport(id)
      .then((data) => {
        if (!cancelled) setReport(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "This report could not be found.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div className="case-area" style={{ margin: "0 auto" }}>
      {loading && <ScanLoader />}
      {!loading && error && (
        <div className="empty-state">
          <h2>Report unavailable</h2>
          <p>
            {error} Reports are held in memory and expire after a set
            retention window, or the server may have restarted since this
            link was generated.
          </p>
          <p style={{ marginTop: 16 }}>
            <Link to="/" className="btn btn-primary" style={{ textDecoration: "none", display: "inline-block" }}>
              Start a new analysis
            </Link>
          </p>
        </div>
      )}
      {!loading && report && <ReportView report={report} readOnly />}
    </div>
  );
}
