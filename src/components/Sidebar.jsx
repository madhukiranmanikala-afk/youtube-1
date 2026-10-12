import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../context/appContext'
import { categories } from '../data/videos'
import {
  ClockIcon,
  FlagIcon,
  GameIcon,
  HelpIcon,
  HistoryIcon,
  HomeIcon,
  LibraryIcon,
  MusicIcon,
  PlaylistIcon,
  SettingsIcon,
  ShortsIcon,
  SignOutIcon,
  SubscriptionsIcon,
  ThumbUpIcon,
  TrendIcon,
  UserIcon,
  VideoPlusIcon,
} from './Icons'

const mainLinks = [
  { label: 'Home', to: '/', icon: HomeIcon },
  { label: 'Shorts', to: '/shorts', icon: ShortsIcon },
  { label: 'Subscriptions', to: '/subscriptions', icon: SubscriptionsIcon },
]

const youLinks = [
  { label: 'Your channel', to: '/channel/me', icon: UserIcon },
  { label: 'History', to: '/history', icon: HistoryIcon },
  { label: 'Playlists', to: '/channel/me', icon: PlaylistIcon },
  { label: 'Your videos', to: '/channel/me', icon: VideoPlusIcon },
  { label: 'Watch later', to: '/history', icon: ClockIcon },
  { label: 'Liked videos', to: '/history', icon: ThumbUpIcon },
]

const exploreLinks = [
  { label: 'Trending', to: '/', icon: TrendIcon },
  { label: 'Music', to: '/results?q=Music', icon: MusicIcon },
  { label: 'Gaming', to: '/results?q=Gaming', icon: GameIcon },
  { label: 'News', to: '/results?q=News', icon: LibraryIcon },
]

const accountLinks = [
  { label: 'Settings', icon: SettingsIcon },
  { label: 'Help', icon: HelpIcon },
  { label: 'Send feedback', icon: FlagIcon },
  { label: 'Sign out', icon: SignOutIcon },
]

const subscriptions = [
  { name: 'Fireship', color: '#ef4444' },
  { name: 'Veritasium', color: '#3b82f6' },
  { name: 'Kurzgesagt', color: '#06b6d4' },
  { name: 'Marques Brownlee', color: '#22c55e' },
  { name: 'Lofi Girl', color: '#6366f1' },
  { name: 'MrBeast', color: '#16a34a' },
]

function Row({ icon: Icon, label, to, active, onClick }) {
  const base =
    'flex items-center gap-6 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/10'
  const content = (
    <>
      <Icon size={24} className="shrink-0" />
      <span className="truncate">{label}</span>
    </>
  )
  if (to) {
    return (
      <NavLink
        to={to}
        end
        onClick={onClick}
        className={({ isActive }) => `${base} ${isActive || active ? 'bg-black/10 font-medium dark:bg-white/15' : ''}`}
      >
        {content}
      </NavLink>
    )
  }
  return (
    <button type="button" onClick={onClick} className={`${base} w-full text-left`}>
      {content}
    </button>
  )
}

export default function Sidebar() {
  const { sidebarOpen, closeSidebar } = useApp()
  const navigate = useNavigate()
  const location = useLocation()

  function goCategory(cat) {
    closeSidebar()
    if (cat === 'All') navigate('/')
    else navigate(`/results?q=${encodeURIComponent(cat)}`)
  }

  const expanded = (
    <nav className="no-scrollbar flex h-full w-60 flex-col overflow-y-auto px-3 pb-6">
      <div className="flex flex-col gap-0.5 border-b border-black/10 pb-3 dark:border-white/10">
        {mainLinks.map((l) => (
          <Row key={l.label} {...l} onClick={closeSidebar} />
        ))}
      </div>

      <div className="flex flex-col gap-0.5 border-b border-black/10 py-3 dark:border-white/10">
        <h3 className="px-3 pb-1 text-base font-medium">You</h3>
        {youLinks.map((l) => (
          <Row key={l.label} {...l} onClick={closeSidebar} />
        ))}
      </div>

      <div className="flex flex-col gap-0.5 border-b border-black/10 py-3 dark:border-white/10">
        <h3 className="px-3 pb-1 text-base font-medium">Subscriptions</h3>
        {subscriptions.map((s) => (
          <button
            key={s.name}
            onClick={() => {
              closeSidebar()
              navigate(`/channel/${encodeURIComponent(s.name)}`)
            }}
            className="flex items-center gap-6 rounded-lg px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
          >
            <span
              className="grid h-6 w-6 shrink-0 place-items-center overflow-hidden rounded-full text-[10px] font-bold text-white"
              style={{ background: s.color }}
            >
              {s.name[0]}
            </span>
            <span className="truncate">{s.name}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-0.5 py-3">
        <h3 className="px-3 pb-1 text-base font-medium">Explore</h3>
        {exploreLinks.map((l) => (
          <Row key={l.label} {...l} onClick={closeSidebar} />
        ))}
        <div className="mt-2 flex flex-wrap gap-1.5 px-3">
          {categories.slice(1, 9).map((c) => (
            <button
              key={c}
              onClick={() => goCategory(c)}
              className="rounded-full bg-black/5 px-3 py-1 text-xs hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20"
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-0.5 border-t border-black/10 py-3 dark:border-white/10">
        <h3 className="px-3 pb-1 text-base font-medium">Account</h3>
        <button
          onClick={() => {
            closeSidebar()
            navigate('/channel/me')
          }}
          className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-black/5 dark:hover:bg-white/10"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-[#ff5b5b] to-[#8b1e1e] text-sm font-bold text-white">
            Y
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium">Your Channel</span>
            <span className="block truncate text-xs text-[#606060] dark:text-[#aaa]">@you</span>
          </span>
        </button>
        {accountLinks.map((l) => (
          <Row key={l.label} {...l} onClick={closeSidebar} />
        ))}
      </div>
    </nav>
  )

  const mini = (
    <nav className="hidden w-[72px] flex-col items-center gap-1 px-1 py-1 lg:flex">
      {[mainLinks[0], mainLinks[1], mainLinks[2], youLinks[0]].map((l) => {
        const Icon = l.icon
        const active = l.to && location.pathname === l.to
        return (
          <NavLink
            key={l.label}
            to={l.to ?? '#'}
            end
            className={`flex w-full flex-col items-center gap-1 rounded-lg px-1 py-4 text-[10px] hover:bg-black/5 dark:hover:bg-white/10 ${
              active ? 'bg-black/10 dark:bg-white/15' : ''
            }`}
          >
            <Icon size={24} />
            <span className="truncate">{l.label}</span>
          </NavLink>
        )
      })}
    </nav>
  )

  return (
    <>
      {/* Desktop pinned sidebar */}
      <aside
        className={`fixed top-14 bottom-0 left-0 z-30 hidden bg-white dark:bg-[#0f0f0f] lg:block ${
          sidebarOpen ? 'w-60 border-r border-black/5 dark:border-white/5' : 'w-[72px]'
        }`}
      >
        {sidebarOpen ? expanded : mini}
      </aside>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}
        aria-hidden={!sidebarOpen}
      >
        <div
          onClick={closeSidebar}
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            sidebarOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute top-0 left-0 h-full bg-white transition-transform duration-200 dark:bg-[#0f0f0f] ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-14 items-center px-3">
            <button
              onClick={closeSidebar}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
            >
              <span className="text-2xl leading-none">≡</span>
            </button>
          </div>
          {expanded}
        </div>
      </div>
    </>
  )
}
