import { useCallback, useEffect, useMemo, useState } from 'react'
import { AppContext } from './appContext'

function loadIds(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export default function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') ?? 'dark')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [history, setHistory] = useState(() => loadIds('history'))
  const [saved, setSaved] = useState(() => loadIds('saved'))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history))
  }, [history])

  useEffect(() => {
    localStorage.setItem('saved', JSON.stringify(saved))
  }, [saved])

  const addToHistory = useCallback((id) => {
    setHistory((h) => [id, ...h.filter((x) => x !== id)].slice(0, 50))
  }, [])

  const clearHistory = useCallback(() => setHistory([]), [])

  const toggleSaved = useCallback((id) => {
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [id, ...s]))
  }, [])

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
      sidebarOpen,
      toggleSidebar: () => setSidebarOpen((s) => !s),
      closeSidebar: () => setSidebarOpen(false),
      history,
      addToHistory,
      clearHistory,
      saved,
      toggleSaved,
    }),
    [theme, sidebarOpen, history, addToHistory, clearHistory, saved, toggleSaved],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
