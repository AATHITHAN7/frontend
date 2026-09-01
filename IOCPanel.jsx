function Group({ label, items }) {
  return (
    <div>
      <div className="ioc-group-label">{label}</div>
      {items && items.length > 0 ? (
        items.map((item, i) => (
          <div className="ioc-item" key={i}>
            {item}
          </div>
        ))
      ) : (
        <div className="ioc-empty">— none —</div>
      )}
    </div>
  );
}

export default function IOCPanel({ iocs }) {
  return (
    <div className="section-block">
      <div className="section-head">
        <h3>Indicators of compromise</h3>
      </div>
      <div className="ioc-grid">
        <Group label="Sender email" items={iocs.emails} />
        <Group label="Domains" items={iocs.domains} />
        <Group label="URLs" items={iocs.urls} />
        <Group label="Attachments" items={iocs.attachments} />
      </div>
    </div>
  );
}
