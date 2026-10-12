import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import VideoCard from '../components/VideoCard'
import { BellIcon, VerifiedIcon } from '../components/Icons'
import { formatCount, subscribedChannels, videos } from '../data/videos'

const ME = {
  name: 'Your Channel',
  handle: '@you',
  verified: false,
  subs: 1_240,
  color: '#ff5b5b',
  description:
    'Welcome to my channel! I create videos about tech, coding and everything in between. Subscribe for new uploads every week.',
}

const TABS = ['Home', 'Videos', 'Shorts', 'Live', 'Playlists', 'Community', 'About']

export default function Channel() {
  const { handle } = useParams()
  const [tab, setTab] = useState('Videos')
  const [subscribed, setSubscribed] = useState(false)

  const channel = useMemo(() => {
    if (!handle || handle === 'me' || handle === 'you') return ME
    const found = videos.find(
      (v) => v.channel.handle === handle || v.channel.name === handle,
    )
    return found?.channel ?? ME
  }, [handle])

  const channelVideos = useMemo(() => {
    const own = videos.filter((v) => v.channel.name === channel.name)
    return own.length ? own : videos.slice(0, 8)
  }, [channel.name])

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-4">
      <div className="h-32 w-full rounded-xl bg-gradient-to-r from-[#7c3aed] via-[#ec4899] to-[#f59e0b] sm:h-44" />

      <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center">
        <span
          className="grid h-32 w-32 shrink-0 place-items-center rounded-full text-4xl font-bold text-white sm:h-40 sm:w-40"
          style={{ background: channel.color }}
        >
          {channel.name[0]}
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="flex items-center gap-2 text-2xl font-bold sm:text-4xl">
            <span className="truncate">{channel.name}</span>
            {channel.verified && <VerifiedIcon size={22} className="shrink-0" />}
          </h1>
          <p className="mt-1 text-sm text-[#606060] dark:text-[#aaa]">
            {channel.handle} · {formatCount(channel.subs)} subscribers · {channelVideos.length} videos
          </p>
          <p className="mt-2 line-clamp-1 max-w-2xl text-sm text-[#606060] dark:text-[#aaa]">
            {channel.description}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => setSubscribed((s) => !s)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                subscribed
                  ? 'bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20'
                  : 'bg-[#0f0f0f] text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90'
              }`}
            >
              {subscribed && <BellIcon size={18} />}
              {subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
            <button className="rounded-full bg-black/5 px-4 py-2 text-sm font-medium hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="no-scrollbar mt-6 flex gap-6 overflow-x-auto border-b border-black/10 dark:border-white/10">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`shrink-0 border-b-2 pb-3 text-sm font-medium transition-colors ${
              tab === t
                ? 'border-[#0f0f0f] dark:border-white'
                : 'border-transparent text-[#606060] hover:text-[#0f0f0f] dark:text-[#aaa] dark:hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'About' ? (
        <div className="mt-6 max-w-2xl">
          <h3 className="text-lg font-semibold">About</h3>
          <p className="mt-2 text-sm text-[#606060] dark:text-[#aaa]">{channel.description}</p>
          <p className="mt-4 text-sm">
            <span className="font-medium">Joined</span>{' '}
            <span className="text-[#606060] dark:text-[#aaa]">Jan 12, 2019</span>
          </p>
          <p className="mt-2 text-sm">
            <span className="font-medium">Subscribers</span>{' '}
            <span className="text-[#606060] dark:text-[#aaa]">{formatCount(channel.subs)}</span>
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {channelVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
      <p className="mt-8 text-center text-xs text-[#909090]">
        Subscribed to alongside {subscribedChannels.length} other channels · mock data
      </p>
    </div>
  )
}
