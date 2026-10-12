import { useState } from 'react'
import { formatCount, getComments } from '../data/videos'
import { ThumbDownIcon, ThumbUpIcon, UserIcon } from './Icons'

export default function CommentSection({ videoId }) {
  const initial = getComments(videoId)
  const [comments, setComments] = useState(initial)
  const [text, setText] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [liked, setLiked] = useState({})

  function post() {
    const body = text.trim()
    if (!body) return
    setComments((c) => [
      {
        id: `new-${Date.now()}`,
        author: 'You',
        avatar: null,
        text: body,
        likes: 0,
        uploaded: 'just now',
      },
      ...c,
    ])
    setText('')
  }

  const visible = expanded ? comments : comments.slice(0, 4)

  return (
    <section className="mt-6">
      <h2 className="text-xl font-medium">
        {formatCount(comments.length)} Comments
      </h2>

      <div className="mt-6 flex gap-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-[#ff5b5b] to-[#8b1e1e] text-white">
          <UserIcon size={20} />
        </span>
        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={text ? 3 : 1}
            placeholder="Add a comment..."
            className="w-full resize-none border-b border-black/15 bg-transparent pb-1 text-sm outline-none focus:border-[#0f0f0f] dark:border-white/15 dark:focus:border-white"
          />
          {text && (
            <div className="mt-2 flex justify-end gap-2">
              <button
                onClick={() => setText('')}
                className="rounded-full px-4 py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={post}
                disabled={!text.trim()}
                className="rounded-full bg-[#065fd4] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Comment
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-6">
        {visible.map((c) => (
          <article key={c.id} className="flex gap-4">
            {c.avatar ? (
              <img src={c.avatar} alt={c.author} className="h-10 w-10 shrink-0 rounded-full object-cover" />
            ) : (
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#ff5b5b] to-[#8b1e1e] text-white">
                <UserIcon size={20} />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-[13px]">
                <span className="font-medium">{c.author}</span>{' '}
                <span className="text-[#606060] dark:text-[#aaa]">{c.uploaded}</span>
              </p>
              <p className="mt-1 text-sm whitespace-pre-wrap">{c.text}</p>
              <div className="mt-2 flex items-center gap-1 text-[#606060] dark:text-[#aaa]">
                <button
                  onClick={() => setLiked((s) => ({ ...s, [c.id]: s[c.id] === 'up' ? null : 'up' }))}
                  className="flex items-center gap-1 rounded-full px-2 py-1 text-xs hover:bg-black/5 dark:hover:bg-white/10"
                >
                  <ThumbUpIcon size={16} filled={liked[c.id] === 'up'} />
                  {formatCount(c.likes + (liked[c.id] === 'up' ? 1 : 0))}
                </button>
                <button
                  onClick={() => setLiked((s) => ({ ...s, [c.id]: 'down' }))}
                  className="rounded-full px-2 py-1 hover:bg-black/5 dark:hover:bg-white/10"
                >
                  <ThumbDownIcon size={16} filled={liked[c.id] === 'down'} />
                </button>
                <button className="rounded-full px-3 py-1 text-xs font-medium hover:bg-black/5 dark:hover:bg-white/10">
                  Reply
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {comments.length > 4 && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-6 w-full rounded-lg py-2 text-sm font-medium text-[#065fd4] hover:bg-black/5 dark:text-[#3ea6ff] dark:hover:bg-white/10"
        >
          {expanded ? 'Show less' : `${comments.length - 4} more replies`}
        </button>
      )}
    </section>
  )
}
