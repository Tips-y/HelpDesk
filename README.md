# HelpDesk Student Assistance Queue

A React application that manages student assistance requests during laboratory sessions. Students can submit requests with a concern and priority, while the instructor can manage, resolve, filter, and delete requests.

This project demonstrates the use of React hooks including `useState`, `useEffect`, `useRef`, and `useContext`.

## Features

- Submit student assistance requests
- Validate student names and concerns
- Set request priority to **High** or **Normal**
- Automatically organize requests using a priority queue
- High-priority requests appear before Normal requests
- Older requests appear first within the same priority
- Resolve waiting requests
- Delete requests
- Filter requests by:
  - All
  - Waiting
  - Resolved
- Display waiting, resolved, and total request counts
- Save requests using `localStorage`
- Restore requests after refreshing the browser
- Automatically focus the student name field
- Focus the concern field when the concern is empty
- Switch between light and dark themes
- Update the browser title based on the number of waiting requests
- Responsive interface for narrow screens

## Technologies Used

- React
- JavaScript
- JSX
- CSS
- Vite
- Node.js
- npm
- Browser Local Storage

## React Hooks Used

### `useState`

Used to manage:

- Request data
- Selected status filter
- Form input values
- Theme
- Storage warning state

### `useEffect`

Used to:

- Save requests to `localStorage`
- Update the browser document title
- Focus inputs when needed
- Handle synchronization with browser features

### `useRef`

Used to directly access form elements for input focus without causing unnecessary re-renders.

### `useContext`

Used to share the application's theme settings across components without passing the theme through props.

## Request Data Structure

Each assistance request follows this structure:

```javascript
{
  id: "unique-id",
  studentName: "Ana",
  concern: "My component does not update.",
  priority: "High",
  status: "Waiting",
  createdAt: 1790000000000
}
```

## Queue Behavior

Requests are sorted according to the following rules:

1. **High** priority requests appear before **Normal** priority requests.
2. Requests with the same priority are sorted by `createdAt`.
3. Older requests appear before newer requests.
4. Requests are not modified directly when sorting or updating.

For example:

```text
Ben   - High
Cara  - High
Ana   - Normal
```

If Ana was submitted first, followed by Ben and Cara, the queue will still place the High-priority requests first while maintaining their submission order.

## Project Structure

```text
src/
├── main.jsx
├── App.jsx
├── styles.css
├── queue.js
│
├── context/
│   └── ThemeContext.jsx
│
└── components/
    ├── Header.jsx
    ├── RequestForm.jsx
    ├── QueueSummary.jsx
    ├── RequestList.jsx
    └── RequestCard.jsx
```

### Component Responsibilities

**App.jsx**
- Owns the request data
- Manages the selected filter
- Handles adding, resolving, and deleting requests
- Calculates derived values

**RequestForm.jsx**
- Handles student input
- Validates form data
- Creates new requests
- Manages input focus

**Header.jsx**
- Displays the application header
- Provides the theme toggle

**QueueSummary.jsx**
- Displays waiting, resolved, and total counts

**RequestList.jsx**
- Displays filtered and sorted requests

**RequestCard.jsx**
- Displays individual request information
- Provides Resolve and Delete actions

**ThemeContext.jsx**
- Provides shared theme settings
- Contains the theme state and toggle function

**queue.js**
- Contains queue-related helper functions

## Installation

### Prerequisites

Make sure you have the following installed:

- Node.js 22.12 or newer supported version
- npm
- VS Code
- A modern web browser

### Clone the Repository

```bash
git clone <your-repository-url>
cd <your-project-folder>
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

Open the local development URL shown in the terminal, usually:

```text
http://localhost:5173/
```

## Testing

The following test cases were used to verify the application.

| Test | Expected Result |
|---|---|
| Submit a blank name | Submission is rejected and the name field is focused |
| Submit a blank concern | Submission is rejected and the concern field is focused |
| Add Ana Normal, Ben High, Cara High | Requests appear as Ben, Cara, Ana |
| Resolve Ben | Waiting count decreases and resolved count increases |
| Select Waiting | Only waiting requests are displayed |
| Select Resolved | Only resolved requests are displayed |
| Refresh the browser | Requests and statuses remain |
| Delete Cara | Cara is removed and counts are updated |
| Switch theme | All theme consumers update |
| Submit a valid request | Form resets and name field receives focus |

## Browser Storage

The application uses `localStorage` to persist requests.

The requests are stored using the key:

```text
helpdesk-requests
```

Requests are loaded when the application starts and saved whenever the request state changes.

If browser storage is unavailable, the application displays a warning instead of preventing the application from running.

## Responsive Design

The interface is designed to remain usable on smaller screens. Form fields, filters, request cards, and action buttons adjust to fit narrow screen sizes.

## Important React Concepts Demonstrated

### Immutable State Updates

Existing state arrays and objects are not modified directly.

Instead of:

```javascript
requests.push(newRequest);
```

the application creates a new array:

```javascript
setRequests(previous => [...previous, newRequest]);
```

Requests are also updated using `map()` and removed using `filter()`.

### Functional State Updates

Functional updates are used when the new state depends on the previous state:

```javascript
setRequests(previous => [
  ...previous,
  newRequest
]);
```

### Derived Values

Queue counts and filtered requests are calculated directly from the current request state instead of being stored as separate state values.

This prevents duplicated state and keeps the interface consistent.

### Effect Dependencies

Each effect includes the values it depends on.

For example, the storage effect depends on `requests`:

```javascript
useEffect(() => {
  localStorage.setItem(
    "helpdesk-requests",
    JSON.stringify(requests)
  );
}, [requests]);
```

The document title effect depends on `waitingCount`:

```javascript
useEffect(() => {
  const originalTitle = document.title;

  document.title = `HelpDesk — ${waitingCount} waiting`;

  return () => {
    document.title = originalTitle;
  };
}, [waitingCount]);
```

### Refs and Input Focus

`useRef` is used when the application needs direct access to a DOM element.

```javascript
const nameInputRef = useRef(null);
```

The reference can then be used to focus the input:

```javascript
nameInputRef.current?.focus();
```

### Context

The theme is shared using React Context so components such as the header, form, and request cards can access the theme without passing it through intermediate components as props.

## Reflection

### Why is the request list stored in state rather than a ref?

The request list is stored in state because changes to the requests need to update and re-render the interface. A ref does not cause a component to re-render when its value changes.

### Why must existing state arrays and objects remain unmodified?

They must remain unmodified so React can properly detect changes and update the interface. Instead of changing the original array or object, a new copy should be created using methods such as `map()`, `filter()`, or the spread operator.

### When should you use a functional state update?

A functional state update should be used when the new state depends on the previous state. For example:

```javascript
setRequests(previous => [
  ...previous,
  newRequest
]);
```

### What does each effect dependency array control in this application?

The dependency array controls when an effect runs again. The storage effect runs when `requests` changes, while the document title effect runs when `waitingCount` changes. An empty dependency array makes the focus effect run when the component mounts.

### Why is an input ref appropriate for focus management?

An input ref provides direct access to the DOM element, allowing the application to call `.focus()` when needed. This is useful for focusing the name field when the form mounts or after a valid submission.

### How does context reduce passing props through intermediate components?

Context allows shared values such as the theme and theme toggle function to be accessed directly by components that need them. This avoids passing the theme through multiple intermediate components using props.

### Why are filtered requests and queue counts calculated during rendering?

They are derived values that can be calculated directly from the current requests state. Storing them separately in state or using effects would create unnecessary state and could cause the values to become inconsistent.

## Limitations

- Requests are stored only on the current browser/device.
- Requests are not synchronized between different devices.
- There is no instructor authentication.
- There is no backend database.
- Clearing browser storage will remove saved requests.

## References

- [React `useState`](https://react.dev/reference/react/useState)
- [React `useEffect`](https://react.dev/reference/react/useEffect)
- [React `useRef`](https://react.dev/reference/react/useRef)
- [React `useContext`](https://react.dev/reference/react/useContext)

## Project Information

**Project:** HelpDesk Student Assistance Queue  
**Type:** React Laboratory Project  
**Mode:** Individual or Pair  
**Purpose:** Demonstrate React state management, effects, refs, context, browser storage, and derived values.
