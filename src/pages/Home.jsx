import { useMemo, useState } from 'react'
import ChipBar from '../components/ChipBar'
import VideoCard from '../components/VideoCard'
import { categories, videos } from '../data/videos'

export default function Home() {
  const [active, setActive] = useState('All')

  const filtered = useMemo(() => {
    if (active === 'All') return videos
    return videos.filter((v) => v.category === active)
  }, [active])

  return (
    <div className="pb-10">
      <ChipBar items={categories} active={active} onSelect={setActive} />
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 px-4 pt-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {filtered.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="px-4 py-20 text-center text-[#606060] dark:text-[#aaa]">
          No videos in this category yet.
        </p>
      )}
    </div>
  )
}
