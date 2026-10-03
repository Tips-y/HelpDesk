import { useContext } from 'react'
import { ThemeContext } from '../context/themeContext'

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <header className="topbar panel">
      <div>
        <p className="eyebrow">Lab support desk</p>
        <h1>HelpDesk Student Assistance Queue</h1>
      </div>

      <button type="button" className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? 'Dark mode' : 'Light mode'}
      </button>
    </header>
  )
}

export default Header
