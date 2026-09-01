import { useState } from "react";
import { SAMPLE_CASES } from "../sampleCases";

const emptyForm = {
  senderEmail: "",
  senderName: "",
  replyTo: "",
  subject: "",
  body: "",
  urls: [{ href: "", text: "" }],
  attachments: [""]
};

export default function IntakeForm({ onAnalyze, loading }) {
  const [form, setForm] = useState(emptyForm);
  const [validationError, setValidationError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function updateUrl(index, key, value) {
    setForm((f) => {
      const urls = [...f.urls];
      urls[index] = { ...urls[index], [key]: value };
      return { ...f, urls };
    });
  }

  function addUrlRow() {
    setForm((f) => ({ ...f, urls: [...f.urls, { href: "", text: "" }] }));
  }

  function removeUrlRow(index) {
    setForm((f) => ({ ...f, urls: f.urls.filter((_, i) => i !== index) }));
  }

  function updateAttachment(index, value) {
    setForm((f) => {
      const attachments = [...f.attachments];
      attachments[index] = value;
      return { ...f, attachments };
    });
  }

  function addAttachmentRow() {
    setForm((f) => ({ ...f, attachments: [...f.attachments, ""] }));
  }

  function removeAttachmentRow(index) {
    setForm((f) => ({ ...f, attachments: f.attachments.filter((_, i) => i !== index) }));
  }

  function loadSample(sample) {
    setForm({
      ...sample,
      urls: sample.urls.length ? sample.urls : [{ href: "", text: "" }],
      attachments: sample.attachments.length ? sample.attachments : [""]
    });
    setValidationError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.senderEmail || !form.senderEmail.includes("@")) {
      setValidationError("Enter the sender's email address to run an analysis.");
      return;
    }
    setValidationError("");
    const payload = {
      ...form,
      urls: form.urls.filter((u) => u.href.trim()),
      attachments: form.attachments.map((a) => a.trim()).filter(Boolean)
    };
    onAnalyze(payload);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="rail-title">Case intake</div>
      <p className="rail-subtitle">
        Paste in what the recipient received. Every field below feeds a
        specific piece of forensic analysis on the right.
      </p>

      <div className="field">
        <label htmlFor="senderEmail">Sender email address</label>
        <input
          id="senderEmail"
          type="email"
          placeholder="security@paypa1-login.com"
          value={form.senderEmail}
          onChange={(e) => update("senderEmail", e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="senderName">Display name shown in the inbox</label>
        <input
          id="senderName"
          type="text"
          placeholder="PayPal Security"
          value={form.senderName}
          onChange={(e) => update("senderName", e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="replyTo">Reply-To address (if different)</label>
        <input
          id="replyTo"
          type="text"
          placeholder="Leave blank if same as sender"
          value={form.replyTo}
          onChange={(e) => update("replyTo", e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="subject">Subject line</label>
        <input
          id="subject"
          type="text"
          placeholder="Your account will be suspended!"
          value={form.subject}
          onChange={(e) => update("subject", e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="body">Message body</label>
        <textarea
          id="body"
          placeholder="Paste the full message text here..."
          value={form.body}
          onChange={(e) => update("body", e.target.value)}
        />
      </div>

      <div className="field">
        <label>Links in the message</label>
        {form.urls.map((u, i) => (
          <div className="repeat-row" key={i}>
            <input
              type="text"
              placeholder="Actual URL: http://paypa1-login.com/verify"
              value={u.href}
              onChange={(e) => updateUrl(i, "href", e.target.value)}
            />
            {form.urls.length > 1 && (
              <button type="button" className="icon-btn" onClick={() => removeUrlRow(i)} aria-label="Remove link">
                ×
              </button>
            )}
          </div>
        ))}
        {form.urls.map((u, i) => (
          <div className="repeat-row" key={`text-${i}`} style={{ marginTop: -4 }}>
            <input
              type="text"
              placeholder="Displayed text (optional): www.paypal.com/verify"
              value={u.text}
              onChange={(e) => updateUrl(i, "text", e.target.value)}
            />
          </div>
        ))}
        <button type="button" className="add-row-btn" onClick={addUrlRow}>
          + Add another link
        </button>
        <div className="hint">Displayed text lets us catch links that say one thing but point somewhere else.</div>
      </div>

      <div className="field">
        <label>Attachments</label>
        {form.attachments.map((a, i) => (
          <div className="repeat-row" key={i}>
            <input
              type="text"
              placeholder="invoice.pdf.exe"
              value={a}
              onChange={(e) => updateAttachment(i, e.target.value)}
            />
            {form.attachments.length > 1 && (
              <button type="button" className="icon-btn" onClick={() => removeAttachmentRow(i)} aria-label="Remove attachment">
                ×
              </button>
            )}
          </div>
        ))}
        <button type="button" className="add-row-btn" onClick={addAttachmentRow}>
          + Add another attachment
        </button>
      </div>

      {validationError && <div className="error-banner">{validationError}</div>}

      <div className="rail-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Analysing…" : "Run analysis"}
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => loadSample(SAMPLE_CASES[0].data)}
          disabled={loading}
        >
          Load PS-02 sample case
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => loadSample(SAMPLE_CASES[1].data)}
          disabled={loading}
        >
          Load legitimate-mail sample
        </button>
      </div>
    </form>
  );
}
