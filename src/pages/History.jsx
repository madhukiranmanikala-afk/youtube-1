import { useState } from 'react'
import { Link } from 'react-router-dom'
import VideoCard from '../components/VideoCard'
import { HistoryIcon, SearchIcon } from '../components/Icons'
import { useApp } from '../context/appContext'
import { getVideosByIds } from '../data/videos'

export default function History() {
  const { history, clearHistory } = useApp()
  const [query, setQuery] = useState('')
  const [paused, setPaused] = useState(false)

  const all = getVideosByIds(history)
  const list = query
    ? all.filter(
        (v) =>
          v.title.toLowerCase().includes(query.toLowerCase()) ||
          v.channel.name.toLowerCase().includes(query.toLowerCase()),
      )
    : all

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Watch history</h1>
        <div className="flex items-center gap-3">
          <div className="flex h-10 flex-1 items-center gap-2 rounded-full border border-black/15 px-4 dark:border-white/20 sm:w-64">
            <SearchIcon size={18} className="text-[#606060] dark:text-[#aaa]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search watch history"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          <button
            onClick={() => setPaused((p) => !p)}
            className="rounded-full bg-black/5 px-4 py-2 text-sm font-medium hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20"
          >
            {paused ? 'Resume' : 'Pause'} history
          </button>
          <button
            onClick={clearHistory}
            className="rounded-full bg-black/5 px-4 py-2 text-sm font-medium hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20"
          >
            Clear all
          </button>
        </div>
      </div>

      {paused && (
        <p className="mt-4 rounded-lg bg-yellow-500/15 px-4 py-3 text-sm text-yellow-700 dark:text-yellow-300">
          Watch history is paused. Videos you watch won&apos;t be added.
        </p>
      )}

      {list.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <HistoryIcon size={56} className="text-[#909090]" />
          <p className="mt-4 text-lg font-medium">
            {all.length === 0 ? 'Keep track of what you watch' : 'No matching videos'}
          </p>
          <p className="mt-1 max-w-sm text-sm text-[#606060] dark:text-[#aaa]">
            {all.length === 0
              ? 'Watch history isn’t viewable when signed out. Once you watch a video it will appear here.'
              : 'Try a different search term.'}
          </p>
          <Link
            to="/"
            className="mt-6 rounded-full bg-[#065fd4] px-5 py-2.5 text-sm font-medium text-white"
          >
            Browse videos
          </Link>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {list.map((video) => (
            <VideoCard key={video.id} video={video} layout="list" />
          ))}
        </div>
      )}
    </div>
  )
}
