import RequestCard from './RequestCard'

const FILTERS = ['All', 'Waiting', 'Resolved']

function RequestList({ requests, selectedFilter, onFilterChange, onResolve, onDelete }) {
  return (
    <section className="panel request-panel" aria-labelledby="queue-heading">
      <div className="panel-header">
        <h2 id="queue-heading">Assistance queue</h2>
        <div className="filter-group" role="tablist" aria-label="Request status filters">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              className={selectedFilter === filter ? 'filter-button active' : 'filter-button'}
              onClick={() => onFilterChange(filter)}
              aria-pressed={selectedFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {requests.length === 0 ? (
        <p className="empty-state">No requests match this filter.</p>
      ) : (
        <ul className="request-list">
          {requests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onResolve={onResolve}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

export default RequestList
