import { useState } from 'react'
import {
  MoreIcon,
  PlayIcon,
  ThumbDownIcon,
  ThumbUpIcon,
} from '../components/Icons'
import { formatCount, shorts } from '../data/videos'

function ShortItem({ short }) {
  const [reaction, setReaction] = useState(null)
  const [subscribed, setSubscribed] = useState(false)
  const likes = short.likes + (reaction === 'up' ? 1 : 0)

  return (
    <div className="snap-start snap-always flex h-[calc(100vh-3.5rem)] w-full shrink-0 items-center justify-center px-4 py-4">
      <div className="relative h-full max-h-[820px] overflow-hidden rounded-2xl bg-black">
        <video
          src={short.src}
          poster={short.thumbnail}
          loop
          muted
          playsInline
          onClick={(e) => (e.currentTarget.paused ? e.currentTarget.play() : e.currentTarget.pause())}
          className="h-full w-auto max-w-[min(92vw,460px)] object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />

        <div className="absolute right-3 bottom-24 flex flex-col items-center gap-5 text-white">
          <button
            onClick={() => setReaction((r) => (r === 'up' ? null : 'up'))}
            className="flex flex-col items-center gap-1"
          >
            <span className={`grid h-11 w-11 place-items-center rounded-full ${reaction === 'up' ? 'bg-white text-black' : 'bg-white/20'}`}>
              <ThumbUpIcon size={22} filled={reaction === 'up'} />
            </span>
            <span className="text-xs">{formatCount(likes)}</span>
          </button>
          <button
            onClick={() => setReaction((r) => (r === 'down' ? null : 'down'))}
            className="flex flex-col items-center gap-1"
          >
            <span className={`grid h-11 w-11 place-items-center rounded-full ${reaction === 'down' ? 'bg-white text-black' : 'bg-white/20'}`}>
              <ThumbDownIcon size={22} filled={reaction === 'down'} />
            </span>
            <span className="text-xs">Dislike</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white/20 text-lg font-semibold">
              {formatCount(short.comments)}
            </span>
            <span className="text-xs">Comments</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white/20">
              <PlayIcon size={22} />
            </span>
            <span className="text-xs">Share</span>
          </button>
          <button className="grid h-11 w-11 place-items-center rounded-full bg-white/20">
            <MoreIcon size={22} />
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-4 pr-20 text-white">
          <span
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold"
            style={{ background: short.channel.color }}
          >
            {short.channel.name[0]}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{short.channel.name}</p>
            <p className="line-clamp-2 text-sm text-white/90">{short.title}</p>
          </div>
          <button
            onClick={() => setSubscribed((s) => !s)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium ${
              subscribed ? 'bg-white/20 text-white' : 'bg-white text-black'
            }`}
          >
            {subscribed ? 'Subscribed' : 'Subscribe'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Shorts() {
  return (
    <div className="no-scrollbar h-[calc(100vh-3.5rem)] snap-y snap-mandatory overflow-y-auto bg-black/95">
      {shorts.map((short) => (
        <ShortItem key={short.id} short={short} />
      ))}
    </div>
  )
}
