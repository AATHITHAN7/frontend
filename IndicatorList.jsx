export default function IndicatorList({ indicators }) {
  return (
    <div className="section-block">
      <div className="section-head">
        <h3>Indicators that fired</h3>
        <span className="section-count">{indicators.length} total</span>
      </div>
      {indicators.length === 0 ? (
        <div className="no-indicators">No indicators of manipulation or spoofing were found in the supplied content.</div>
      ) : (
        <div>
          {indicators.map((ind) => (
            <div className="indicator-row" key={ind.id}>
              <span className={`severity-chip severity-${ind.severity}`}>{ind.severity}</span>
              <div className="indicator-body">
                <div className="indicator-category">{ind.category}</div>
                <div className="indicator-title">{ind.title}</div>
                <div className="indicator-detail">{ind.detail}</div>
                {ind.evidence && <div className="indicator-evidence">{ind.evidence}</div>}
              </div>
              <div className="indicator-weight">+{ind.weight}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
