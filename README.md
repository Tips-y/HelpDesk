**HelpDesk Student Assistance Queue **

Build a React application that manages student assistance requests during laboratory sessions. Use useState, useEffect, useRef, and useContext to connect user interactions, browser features, and shared interface settings. 

Learning outcomes 

Manage primitive values and arrays of objects using useState. 

Synchronize requests with browser storage and the document title using useEffect. 

Focus form inputs using useRef without modifying refs during rendering. 

Share theme settings across components using useContext. 

Explain immutable updates, effect dependencies, and derived values. 

Scenario 

Several students need assistance at the same time. Your application lets students enter their name, concern, and priority. The instructor views the queue, resolves requests, and deletes entries. High priority requests appear before Normal priority requests; within each priority, older requests appear first. 

This laboratory uses browser storage on one device. It does not provide shared access across devices or instructor authentication. 

 

Application requirements 

Feature 

Required behavior 

Request form 

Reject blank or whitespace-only names and concerns. 

Priority queue 

High before Normal; first-in, first-out within each priority. 

Request actions 

Resolve a waiting request and delete any request. 

Status filter 

Show All, Waiting, or Resolved requests. 

Summary 

Display waiting, resolved, and total counts. 

Persistence 

Restore requests and statuses after refreshing. 

Input focus 

Focus the name field on mount and after a valid submission. 

Theme 

Switch the interface between light and dark through context. 

 

Recommended file organization 

src/ 

  main.jsx 

  App.jsx 

  styles.css 

  queue.js 

  context/ThemeContext.jsx 

  components/Header.jsx 

  components/RequestForm.jsx 

  components/QueueSummary.jsx 

  components/RequestList.jsx 

  components/RequestCard.jsx 

 

App owns request data and passes it through props. ThemeProvider sits above App and provides the shared theme. Keep React StrictMode enabled. 

 

Task 1 Build the interface 

 

Create the recommended components and import them into App. 

Add a name input, concern textarea, priority dropdown, and submit button. 

Add a status filter, queue summary, and request cards with Resolve and Delete buttons. 

Use two temporary sample requests to check the layout. Give each list item a stable request ID as its key. 

Use visible labels and a layout that remains usable on a narrow screen. 

Checkpoint: All components render, fields have labels, and request cards display the expected information. 

Task 2 Manage requests using useState 

 

Store requests and the selected filter in App. Store form inputs in RequestForm. Each request must use the following data structure. 

{ 

  id: "unique-id", 

  studentName: "Ana", 

  concern: "My component does not update.", 

  priority: "High", 

  status: "Waiting", 

  createdAt: 1790000000000 

} 

 

Create controlled inputs using value and onChange. 

Prevent default form submission and validate trimmed inputs. 

Create an ID with crypto.randomUUID() and a timestamp with Date.now() inside the submit handler. 

Append the request using a functional state update; reset the form after success. 

Implement resolve using map() and delete using filter(). 

Calculate counts and the filtered list directly from requests during rendering. 

setRequests(previous => [...previous, newRequest]); 

 

setRequests(previous => 

  previous.map(request => 

    request.id === requestId 

      ? { ...request, status: "Resolved" } 

      : request 

  ) 

); 

 

Important: Do not mutate state with push(), direct object assignment, or sort() on the original state array. Filter first or copy the array before sorting. Compare priority first, then createdAt. 

Checkpoint: Add three requests, resolve one, and delete another. Counts must remain consistent. 

 

Task 3 Synchronize using useEffect 

 

Initialize requests from browser storage before the saving effect runs. A lazy state initializer prevents an initially empty queue from overwriting saved requests. 

const [requests, setRequests] = useState(() => { 

  try { 

    const saved = JSON.parse( 

      localStorage.getItem("helpdesk-requests") ?? "[]" 

    ); 

    return Array.isArray(saved) ? saved : []; 

  } catch { 

    return []; 

  } 

}); 

 

For a robust solution, validate each stored record before displaying it. The supplied solution includes the isRequest helper for this purpose. 

useEffect(() => { 

  try { 

    localStorage.setItem( 

      "helpdesk-requests", JSON.stringify(requests) 

    ); 

  } catch { 

    // Display a warning that persistence is unavailable. 

  } 

}, [requests]); 

 

Add a storage warning state and display an informative message if saving fails. 

Calculate waitingCount directly from requests. 

Update the document title whenever waitingCount changes. 

Refresh the page and verify that requests and statuses return. 

useEffect(() => { 

  const originalTitle = document.title; 

  document.title = `HelpDesk — ${waitingCount} waiting`; 

  return () => { 

    document.title = originalTitle; 

  }; 

}, [waitingCount]); 

 

Things to note 

Effects synchronize with systems outside React. Form submission belongs in an event handler. 

Include reactive values used by an effect in its dependency array. 

Cleanup runs before the effect is set up again and when the component unmounts. 

StrictMode may run an extra setup and cleanup cycle during development. 

Filtering and counting are derived calculations; do not create effects just to copy these values into state. 

Checkpoint: Saved requests survive refresh, and the browser title matches the waiting count. 

 

Task 4 Focus inputs using useRef 

 

Create a DOM ref in RequestForm and attach it to the student-name input. 

const nameInputRef = useRef(null); 

 

useEffect(() => { 

  nameInputRef.current?.focus(); 

}, []); 

 

<input 

  ref={nameInputRef} 

  value={studentName} 

  onChange={event => setStudentName(event.target.value)} 

/> 

 

Focus the name input when RequestForm mounts. 

After a valid submission, reset the fields and focus the name input again. 

For a blank name, reject submission and focus the name field. 

Add a separate ref for the concern textarea and focus it if the concern is blank. 

Important: Read DOM refs in effects or event handlers. Changing ref.current does not cause a render, so visible counts belong in state or derived calculations. 

Checkpoint: Complete successive submissions using the keyboard without clicking the name field. 

Task 5 Share the theme using useContext 

 

Create a context at module scope. Keep the theme state inside its provider and wrap App with that provider in main.jsx. 

const ThemeContext = createContext(null); 

 

function ThemeProvider({ children }) { 

  const [theme, setTheme] = useState("light"); 

  const toggleTheme = () => setTheme(previous => 

    previous === "light" ? "dark" : "light" 

  ); 

  return ( 

    <ThemeContext.Provider value={{ theme, toggleTheme }}> 

      {children} 

    </ThemeContext.Provider> 

  ); 

} 

 

Import createContext, useState, and useContext from React where they are used. Export the provider and context, or use a custom useTheme hook as in the supplied solution. 

Read the provided object with const { theme, toggleTheme } = useContext(ThemeContext). Use toggleTheme in Header and theme in the interface components. 

Checkpoint: The header, form, and request cards update together. Do not pass theme through props. A provider must be above the component that reads it. 

 

Official references 

React useState reference   https://react.dev/reference/react/useState 

React useEffect reference   https://react.dev/reference/react/useEffect 

React useRef reference   https://react.dev/reference/react/useRef 

React useContext reference   https://react.dev/reference/react/useContext 
