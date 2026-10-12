import { useSearchParams } from 'react-router-dom'
import VideoCard from '../components/VideoCard'
import { searchVideos } from '../data/videos'

export default function Search() {
  const [params] = useSearchParams()
  const query = params.get('q') ?? ''
  const results = searchVideos(query)

  return (
    <div className="mx-auto flex max-w-[1100px] flex-col gap-4 px-4 py-4">
      {results.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg font-medium">No results found</p>
          <p className="mt-2 text-sm text-[#606060] dark:text-[#aaa]">
            Try different keywords or check your spelling.
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-[#606060] dark:text-[#aaa]">
            About {results.length} results for “{query}”
          </p>
          <div className="flex flex-col gap-4">
            {results.map((video) => (
              <VideoCard key={video.id} video={video} layout="list" />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
