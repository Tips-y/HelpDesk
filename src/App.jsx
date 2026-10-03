import { useContext, useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import QueueSummary from './components/QueueSummary'
import RequestForm from './components/RequestForm'
import RequestList from './components/RequestList'
import { ThemeContext } from './context/themeContext'
import { STORAGE_KEY, createSeedRequests, isRequest, sortRequests } from './queue'

function App() {
  const { theme } = useContext(ThemeContext)

  const [requests, setRequests] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null')

      if (!Array.isArray(saved)) {
        return createSeedRequests()
      }

      const validRequests = saved.filter(isRequest)
      return validRequests.length > 0 ? validRequests : createSeedRequests()
    } catch {
      return createSeedRequests()
    }
  })

  const [selectedFilter, setSelectedFilter] = useState('All')
  const [storageWarning, setStorageWarning] = useState('')

  const waitingCount = requests.filter((request) => request.status === 'Waiting').length
  const resolvedCount = requests.filter((request) => request.status === 'Resolved').length

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(requests))
      setStorageWarning('')
    } catch {
      setStorageWarning('Browser storage is unavailable. Requests will not persist after refresh.')
    }
  }, [requests])

  useEffect(() => {
    const originalTitle = document.title
    document.title = `HelpDesk — ${waitingCount} waiting`

    return () => {
      document.title = originalTitle
    }
  }, [waitingCount])

  const filteredRequests = useMemo(() => {
    const visibleRequests =
      selectedFilter === 'All'
        ? requests
        : requests.filter((request) => request.status === selectedFilter)

    return [...visibleRequests].sort(sortRequests)
  }, [requests, selectedFilter])

  const handleAddRequest = (newRequest) => {
    setRequests((previousRequests) => [...previousRequests, newRequest])
  }

  const handleResolve = (requestId) => {
    setRequests((previousRequests) =>
      previousRequests.map((request) =>
        request.id === requestId ? { ...request, status: 'Resolved' } : request,
      ),
    )
  }

  const handleDelete = (requestId) => {
    setRequests((previousRequests) =>
      previousRequests.filter((request) => request.id !== requestId),
    )
  }

  return (
    <div className={`app-shell ${theme}`}>
      <Header />

      <main className="app-layout">
        <RequestForm onSubmit={handleAddRequest} />

        <QueueSummary
          waitingCount={waitingCount}
          resolvedCount={resolvedCount}
          totalCount={requests.length}
        />

        {storageWarning ? <p className="storage-warning">{storageWarning}</p> : null}

        <RequestList
          requests={filteredRequests}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          onResolve={handleResolve}
          onDelete={handleDelete}
        />
      </main>
    </div>
  )
}

export default App
