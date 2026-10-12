import { useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useApp } from '../context/appContext'
import {
  BellIcon,
  CloseIcon,
  MenuIcon,
  MicIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
  UserIcon,
  VideoPlusIcon,
  YouTubeIcon,
} from './Icons'

export default function Header() {
  const { toggleSidebar, theme, toggleTheme } = useApp()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const paramQuery = params.get('q') ?? ''
  const [query, setQuery] = useState(paramQuery)
  const [lastParam, setLastParam] = useState(paramQuery)
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)

  if (paramQuery !== lastParam) {
    setLastParam(paramQuery)
    setQuery(paramQuery)
  }

  function submit(e) {
    e.preventDefault()
    const q = query.trim()
    if (q) navigate(`/results?q=${encodeURIComponent(q)}`)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between gap-2 bg-white px-4 dark:bg-[#0f0f0f]">
      <div className="flex items-center gap-1 sm:gap-4">
        <button
          onClick={toggleSidebar}
          aria-label="Toggle menu"
          className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
        >
          <MenuIcon />
        </button>
        <Link to="/" className="flex items-center gap-0.5" aria-label="YouTube Home">
          <YouTubeIcon size={30} className="text-[#ff0000]" />
          <span className="hidden text-xl font-semibold tracking-tighter sm:block">YouTube</span>
        </Link>
      </div>

      <form onSubmit={submit} className="flex max-w-[720px] flex-1 items-center gap-2 sm:gap-4">
        <div
          className={`flex h-10 flex-1 items-center rounded-full border ${
            focused
              ? 'border-[#1c62b9] dark:border-[#3ea6ff]'
              : 'border-[#ccc] dark:border-[#303030]'
          }`}
        >
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search"
            aria-label="Search"
            className="h-full w-full rounded-l-full bg-transparent px-4 text-base outline-none placeholder:text-[#888]"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setQuery('')
                inputRef.current?.focus()
              }}
              className="mr-1 grid h-8 w-8 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
            >
              <CloseIcon size={20} />
            </button>
          )}
        </div>
        <button
          type="submit"
          aria-label="Search"
          className="grid h-10 w-16 place-items-center rounded-full border border-[#ccc] bg-black/5 hover:bg-black/10 dark:border-[#303030] dark:bg-white/10 dark:hover:bg-white/20"
        >
          <SearchIcon size={22} />
        </button>
        <button
          type="button"
          aria-label="Search with voice"
          className="hidden h-10 w-10 place-items-center rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 sm:grid"
        >
          <MicIcon size={20} />
        </button>
      </form>

      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
        >
          {theme === 'dark' ? <SunIcon size={22} /> : <MoonIcon size={22} />}
        </button>
        <button
          aria-label="Create"
          className="hidden h-10 w-10 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 sm:grid"
        >
          <VideoPlusIcon size={22} />
        </button>
        <button
          aria-label="Notifications"
          className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
        >
          <BellIcon size={22} />
          <span className="absolute top-1.5 right-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-[#cc0000] px-1 text-[10px] font-medium text-white">
            9+
          </span>
        </button>
        <Link
          to="/channel/me"
          aria-label="Account"
          className="ml-1 grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-[#ff5b5b] to-[#8b1e1e] text-white"
        >
          <UserIcon size={18} />
        </Link>
      </div>
    </header>
  )
}
