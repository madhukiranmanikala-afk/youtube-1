import { Link } from 'react-router-dom'
import { formatCount } from '../data/videos'
import { MoreIcon, VerifiedIcon } from './Icons'

export default function VideoCard({ video, layout = 'grid' }) {
  const meta = (
    <div className="min-w-0 flex-1">
      <Link
        to={`/watch/${video.id}`}
        className="line-clamp-2 text-[15px] leading-5 font-medium text-[#0f0f0f] dark:text-[#f1f1f1]"
      >
        {video.title}
      </Link>
      <Link
        to={`/watch/${video.id}`}
        className="mt-1 flex items-center gap-1 text-[13px] text-[#606060] hover:text-[#0f0f0f] dark:text-[#aaa] dark:hover:text-[#f1f1f1]"
      >
        <span className="truncate">{video.channel.name}</span>
        {video.channel.verified && <VerifiedIcon size={13} className="shrink-0 text-[#606060] dark:text-[#aaa]" />}
      </Link>
      <p className="text-[13px] text-[#606060] dark:text-[#aaa]">
        {formatCount(video.views)} views · {video.uploaded}
      </p>
    </div>
  )

  if (layout === 'list') {
    return (
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          to={`/watch/${video.id}`}
          className="group relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-black/5 sm:w-[360px]"
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
          <span className="absolute right-1.5 bottom-1.5 rounded bg-black/80 px-1 text-xs font-medium text-white">
            {video.duration}
          </span>
        </Link>
        <div className="flex min-w-0 flex-1 gap-3">
          <div className="min-w-0 flex-1">
            <Link
              to={`/watch/${video.id}`}
              className="line-clamp-2 text-base leading-6 font-normal text-[#0f0f0f] dark:text-[#f1f1f1]"
            >
              {video.title}
            </Link>
            <p className="mt-1 text-xs text-[#606060] dark:text-[#aaa]">
              {formatCount(video.views)} views · {video.uploaded}
            </p>
            <Link
              to={`/watch/${video.id}`}
              className="mt-3 flex items-center gap-2 text-xs text-[#606060] dark:text-[#aaa]"
            >
              <span
                className="grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold text-white"
                style={{ background: video.channel.color }}
              >
                {video.channel.name[0]}
              </span>
              <span className="flex items-center gap-1">
                {video.channel.name}
                {video.channel.verified && <VerifiedIcon size={12} />}
              </span>
            </Link>
            <p className="mt-2 line-clamp-2 hidden text-xs text-[#606060] dark:text-[#aaa] sm:block">
              {video.description.split('\n')[0]}
            </p>
          </div>
          <button aria-label="More options" className="h-8 w-8 shrink-0 rounded-full hover:bg-black/5 dark:hover:bg-white/10 sm:hidden">
            <MoreIcon size={20} className="mx-auto" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="group/card flex flex-col">
      <Link
        to={`/watch/${video.id}`}
        className="group relative aspect-video overflow-hidden rounded-xl bg-black/5"
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        <span className="absolute right-1.5 bottom-1.5 rounded bg-black/80 px-1 text-xs font-medium text-white">
          {video.duration}
        </span>
      </Link>
      <div className="mt-3 flex gap-3">
        <Link
          to={`/watch/${video.id}`}
          className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full text-sm font-bold text-white"
          style={{ background: video.channel.color }}
        >
          {video.channel.name[0]}
        </Link>
        {meta}
        <button
          aria-label="More options"
          className="h-8 w-8 shrink-0 rounded-full opacity-0 hover:bg-black/5 group-hover/card:opacity-100 dark:hover:bg-white/10"
        >
          <MoreIcon size={20} className="mx-auto" />
        </button>
      </div>
    </div>
  )
}
