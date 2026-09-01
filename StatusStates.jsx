export function EmptyState() {
  return (
    <div className="empty-state">
      <h2>No case open</h2>
      <p>
        Fill in the intake form on the left with the sender, subject,
        message body, links, and attachments — or load the PS-02 sample
        case — then run the analysis to generate an evidence-based
        incident report.
      </p>
    </div>
  );
}

export function ScanLoader() {
  return (
    <div className="scan-loader">
      <div>Running sender, domain, URL, language, and attachment analysis…</div>
      <div className="scan-bar" />
    </div>
  );
}
