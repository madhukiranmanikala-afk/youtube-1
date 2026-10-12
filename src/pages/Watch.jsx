import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CommentSection from '../components/CommentSection'
import {
  DownloadIcon,
  MoreIcon,
  SaveIcon,
  ShareIcon,
  ThumbDownIcon,
  ThumbUpIcon,
  VerifiedIcon,
} from '../components/Icons'
import { formatCount, getRelatedVideos, getVideoById } from '../data/videos'
import { useApp } from '../context/appContext'

function RelatedCard({ video }) {
  return (
    <div className="flex gap-2">
      <Link
        to={`/watch/${video.id}`}
        className="group relative aspect-video w-40 shrink-0 overflow-hidden rounded-lg bg-black/5"
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        <span className="absolute right-1 bottom-1 rounded bg-black/80 px-1 text-[11px] font-medium text-white">
          {video.duration}
        </span>
      </Link>
      <div className="min-w-0 flex-1">
        <Link
          to={`/watch/${video.id}`}
          className="line-clamp-2 text-sm leading-5 font-medium"
        >
          {video.title}
        </Link>
        <Link
          to={`/watch/${video.id}`}
          className="mt-1 block truncate text-xs text-[#606060] hover:text-[#0f0f0f] dark:text-[#aaa] dark:hover:text-white"
        >
          {video.channel.name}
        </Link>
        <p className="text-xs text-[#606060] dark:text-[#aaa]">
          {formatCount(video.views)} views · {video.uploaded}
        </p>
      </div>
      <button aria-label="More" className="h-8 w-8 shrink-0 rounded-full hover:bg-black/5 dark:hover:bg-white/10">
        <MoreIcon size={18} className="mx-auto" />
      </button>
    </div>
  )
}

export default function Watch() {
  const { id } = useParams()
  const video = getVideoById(id)
  const related = getRelatedVideos(video)
  const { addToHistory, saved, toggleSaved } = useApp()
  const [descOpen, setDescOpen] = useState(false)
  const [reaction, setReaction] = useState(null)
  const [subscribed, setSubscribed] = useState(false)
  const [lastId, setLastId] = useState(id)

  if (id !== lastId) {
    setLastId(id)
    setDescOpen(false)
    setReaction(null)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    addToHistory(video.id)
  }, [id, video.id, addToHistory])

  const isSaved = saved.includes(video.id)

  const likeCount = video.likes + (reaction === 'up' ? 1 : 0)

  return (
    <div className="flex flex-col gap-6 px-4 pt-4 xl:flex-row xl:justify-center">
      <div className="w-full xl:max-w-[900px]">
        <div className="overflow-hidden rounded-xl bg-black">
          <video
            key={video.id}
            src={video.src}
            poster={video.thumbnail}
            controls
            playsInline
            className="aspect-video w-full"
          />
        </div>

        <h1 className="mt-3 text-xl leading-7 font-semibold">{video.title}</h1>

        <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
              style={{ background: video.channel.color }}
            >
              {video.channel.name[0]}
            </span>
            <div className="min-w-0">
              <Link to="/" className="flex items-center gap-1 text-base font-medium">
                <span className="truncate">{video.channel.name}</span>
                {video.channel.verified && <VerifiedIcon size={14} />}
              </Link>
              <p className="text-xs text-[#606060] dark:text-[#aaa]">
                {formatCount(video.channel.subs)} subscribers
              </p>
            </div>
            <button
              onClick={() => setSubscribed((s) => !s)}
              className={`ml-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                subscribed
                  ? 'bg-black/5 text-[#0f0f0f] hover:bg-black/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20'
                  : 'bg-[#0f0f0f] text-white hover:bg-black/80 dark:bg-[#f1f1f1] dark:text-[#0f0f0f] dark:hover:bg-white'
              }`}
            >
              {subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>

          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto">
            <div className="flex shrink-0 items-center rounded-full bg-black/5 dark:bg-white/10">
              <button
                onClick={() => setReaction((r) => (r === 'up' ? null : 'up'))}
                className="flex items-center gap-2 rounded-l-full py-2 pr-3 pl-4 text-sm font-medium hover:bg-black/10 dark:hover:bg-white/20"
              >
                <ThumbUpIcon size={20} filled={reaction === 'up'} />
                {formatCount(likeCount)}
              </button>
              <span className="h-6 w-px bg-black/15 dark:bg-white/20" />
              <button
                onClick={() => setReaction((r) => (r === 'down' ? null : 'down'))}
                className="rounded-r-full px-3 py-2 hover:bg-black/10 dark:hover:bg-white/20"
                aria-label="Dislike"
              >
                <ThumbDownIcon size={20} filled={reaction === 'down'} />
              </button>
            </div>
            <button className="flex shrink-0 items-center gap-2 rounded-full bg-black/5 px-4 py-2 text-sm font-medium hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20">
              <ShareIcon size={20} /> Share
            </button>
            <button className="flex shrink-0 items-center gap-2 rounded-full bg-black/5 px-4 py-2 text-sm font-medium hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20">
              <DownloadIcon size={20} /> Download
            </button>
            <button
              onClick={() => toggleSaved(video.id)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium hover:bg-black/10 dark:hover:bg-white/20 ${
                isSaved ? 'bg-black/10 dark:bg-white/20' : 'bg-black/5 dark:bg-white/10'
              }`}
            >
              <SaveIcon size={20} /> {isSaved ? 'Saved' : 'Save'}
            </button>
            <button aria-label="More" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20">
              <MoreIcon size={20} />
            </button>
          </div>
        </div>

        <div
          onClick={() => setDescOpen((d) => !d)}
          className={`mt-4 cursor-pointer rounded-xl bg-black/5 p-3 text-sm transition-colors dark:bg-white/10 ${
            descOpen ? '' : 'hover:bg-black/10 dark:hover:bg-white/15'
          }`}
        >
          <p className="font-medium">
            {formatCount(video.views)} views · {video.uploaded}
          </p>
          <p className={`mt-1 whitespace-pre-line ${descOpen ? '' : 'line-clamp-2'}`}>
            {video.description}
          </p>
          <span className="mt-1 inline-block text-sm font-medium">
            {descOpen ? 'Show less' : '...more'}
          </span>
        </div>

        <CommentSection videoId={video.id} />
      </div>

      <aside className="no-scrollbar flex w-full flex-col gap-3 xl:w-[402px] xl:shrink-0">
        {related.map((v) => (
          <RelatedCard key={v.id} video={v} />
        ))}
      </aside>
    </div>
  )
}
