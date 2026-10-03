export const STORAGE_KEY = 'helpdesk-requests'

export const PRIORITY_ORDER = {
  High: 0,
  Normal: 1,
}

export function isRequest(value) {
  return (
    value &&
    typeof value === 'object' &&
    typeof value.id === 'string' &&
    typeof value.studentName === 'string' &&
    typeof value.concern === 'string' &&
    typeof value.priority === 'string' &&
    ['High', 'Normal'].includes(value.priority) &&
    typeof value.status === 'string' &&
    ['Waiting', 'Resolved'].includes(value.status) &&
    typeof value.createdAt === 'number' &&
    Number.isFinite(value.createdAt)
  )
}

export function sortRequests(a, b) {
  const priorityDifference = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]

  if (priorityDifference !== 0) {
    return priorityDifference
  }

  return a.createdAt - b.createdAt
}

export function createSeedRequests() {
  const now = Date.now()

  return [
    {
      id: 'seed-student-1',
      studentName: 'Mia',
      concern: 'I need help checking the API response in the lab project.',
      priority: 'High',
      status: 'Waiting',
      createdAt: now - 90_000,
    },
    {
      id: 'seed-student-2',
      studentName: 'Leo',
      concern: 'The component keeps rerendering after the submit button is clicked.',
      priority: 'Normal',
      status: 'Waiting',
      createdAt: now - 45_000,
    },
  ]
}
