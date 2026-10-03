function QueueSummary({ waitingCount, resolvedCount, totalCount }) {
  return (
    <section className="summary-panel panel" aria-label="Queue summary">
      <div className="summary-item">
        <span className="summary-label">Waiting</span>
        <strong>{waitingCount}</strong>
      </div>
      <div className="summary-item">
        <span className="summary-label">Resolved</span>
        <strong>{resolvedCount}</strong>
      </div>
      <div className="summary-item">
        <span className="summary-label">Total</span>
        <strong>{totalCount}</strong>
      </div>
    </section>
  )
}

export default QueueSummary
