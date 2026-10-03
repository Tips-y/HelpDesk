import { useEffect, useRef, useState } from 'react'

function RequestForm({ onSubmit }) {
  const [studentName, setStudentName] = useState('')
  const [concern, setConcern] = useState('')
  const [priority, setPriority] = useState('Normal')
  const [errorMessage, setErrorMessage] = useState('')

  const nameInputRef = useRef(null)
  const concernInputRef = useRef(null)

  useEffect(() => {
    nameInputRef.current?.focus()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedName = studentName.trim()
    const trimmedConcern = concern.trim()

    if (!trimmedName) {
      setErrorMessage('Please enter the student name before submitting.')
      nameInputRef.current?.focus()
      return
    }

    if (!trimmedConcern) {
      setErrorMessage('Please describe the concern before submitting.')
      concernInputRef.current?.focus()
      return
    }

    const newRequest = {
      id: crypto.randomUUID(),
      studentName: trimmedName,
      concern: trimmedConcern,
      priority,
      status: 'Waiting',
      createdAt: Date.now(),
    }

    onSubmit(newRequest)
    setStudentName('')
    setConcern('')
    setPriority('Normal')
    setErrorMessage('')
    nameInputRef.current?.focus()
  }

  return (
    <section className="panel form-panel" aria-labelledby="request-form-title">
      <h2 id="request-form-title">Submit a request</h2>

      <form className="request-form" onSubmit={handleSubmit} noValidate>
        <div className="field-group">
          <label htmlFor="student-name">Student name</label>
          <input
            id="student-name"
            ref={nameInputRef}
            type="text"
            value={studentName}
            onChange={(event) => setStudentName(event.target.value)}
            placeholder="Enter student name"
          />
        </div>

        <div className="field-group">
          <label htmlFor="student-concern">Concern</label>
          <textarea
            id="student-concern"
            ref={concernInputRef}
            value={concern}
            onChange={(event) => setConcern(event.target.value)}
            placeholder="Describe the issue"
            rows="4"
          />
        </div>

        <div className="field-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            <option value="High">High</option>
            <option value="Normal">Normal</option>
          </select>
        </div>

        {errorMessage ? <p className="form-error">{errorMessage}</p> : null}

        <button type="submit" className="primary-button full-width">
          Add request
        </button>
      </form>
    </section>
  )
}

export default RequestForm
