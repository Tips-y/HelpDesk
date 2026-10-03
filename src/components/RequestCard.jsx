function RequestCard({ request, onResolve, onDelete }) {
  const isResolved = request.status === 'Resolved'

  return (
    <li className="request-card panel">
      <div className="request-card-header">
        <div>
          <p className="request-student">{request.studentName}</p>
          <span className={`priority-badge ${request.priority.toLowerCase()}`}>
            {request.priority}
          </span>
        </div>
        <span className={`status-badge ${request.status.toLowerCase()}`}>{request.status}</span>
      </div>

      <p className="request-concern">{request.concern}</p>

      <div className="request-card-actions">
        <button
          type="button"
          className="secondary-button small"
          onClick={() => onResolve(request.id)}
          disabled={isResolved}
        >
          {isResolved ? 'Resolved' : 'Resolve'}
        </button>
        <button type="button" className="danger-button small" onClick={() => onDelete(request.id)}>
          Delete
        </button>
      </div>
    </li>
  )
}

export default RequestCard
