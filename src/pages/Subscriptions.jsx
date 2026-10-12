import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VideoCard from '../components/VideoCard'
import { getSubscribedVideos, subscribedChannels, videos } from '../data/videos'

export default function Subscriptions() {
  const navigate = useNavigate()
  const [active, setActive] = useState('All')

  const channelList = subscribedChannels.map((name) => {
    const v = videos.find((x) => x.channel.name === name)
    return v?.channel ?? { name, color: '#888', subs: 0, verified: true }
  })

  const list =
    active === 'All'
      ? getSubscribedVideos()
      : getSubscribedVideos().filter((v) => v.channel.name === active)

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-4">
      <div className="no-scrollbar flex items-center gap-4 overflow-x-auto pb-4">
        <button
          onClick={() => setActive('All')}
          className={`flex shrink-0 flex-col items-center gap-2 text-xs ${
            active === 'All' ? 'font-medium' : 'text-[#606060] dark:text-[#aaa]'
          }`}
        >
          <span
            className={`grid h-16 w-16 place-items-center rounded-full text-lg font-bold ${
              active === 'All' ? 'bg-[#0f0f0f] text-white dark:bg-white dark:text-black' : 'bg-black/10 dark:bg-white/10'
            }`}
          >
            All
          </span>
          All
        </button>
        {channelList.map((ch) => (
          <button
            key={ch.name}
            onClick={() => setActive(ch.name)}
            className={`flex w-20 shrink-0 flex-col items-center gap-2 text-center text-xs ${
              active === ch.name ? 'font-medium' : 'text-[#606060] dark:text-[#aaa]'
            }`}
          >
            <span
              className={`grid h-16 w-16 place-items-center rounded-full text-lg font-bold text-white ring-2 ${
                active === ch.name ? 'ring-[#0f0f0f] dark:ring-white' : 'ring-transparent'
              }`}
              style={{ background: ch.color }}
            >
              {ch.name[0]}
            </span>
            <span className="line-clamp-1">{ch.name}</span>
          </button>
        ))}
      </div>

      <h2 className="mb-4 text-lg font-semibold">Latest from your subscriptions</h2>
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {list.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      <button
        onClick={() => navigate('/')}
        className="mt-10 w-full rounded-lg border border-black/10 py-3 text-sm font-medium hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
      >
        Manage subscriptions
      </button>
    </div>
  )
}
