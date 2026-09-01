import { useState } from "react";
import { exportUrl } from "../api";

export default function ShareBar({ reportId, onReset }) {
  const [copied, setCopied] = useState(false);
  const shareLink = `${window.location.origin}/report/${reportId}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable; the link is still visible to select manually.
    }
  }

  return (
    <div className="share-bar">
      <div className="share-link-box">{shareLink}</div>
      <button type="button" className="btn btn-ghost" onClick={copyLink}>
        Copy share link
      </button>
      {copied && <span className="copied-note">Copied</span>}
      <a className="btn btn-ghost" href={exportUrl(reportId)} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
        Download HTML report
      </a>
      <button type="button" className="btn btn-primary" onClick={onReset}>
        New analysis
      </button>
    </div>
  );
}
