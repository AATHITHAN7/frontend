function priorityClass(priority) {
  const key = priority.toLowerCase();
  if (key === "immediate") return "p-immediate";
  if (key === "high") return "p-high";
  if (key === "medium") return "p-medium";
  return "";
}

export default function ActionPlan({ actions }) {
  return (
    <div className="section-block">
      <div className="section-head">
        <h3>Recommended action for the security team</h3>
        <span className="section-count">{actions.length} steps</span>
      </div>
      <div>
        {actions.map((a, i) => (
          <div className="action-row" key={i}>
            <span className={`priority-tag ${priorityClass(a.priority)}`}>{a.priority}</span>
            <div>
              <div className="action-title">{a.action}</div>
              <div className="action-detail">{a.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
