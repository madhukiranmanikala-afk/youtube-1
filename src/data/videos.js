const VIDEO_SOURCES = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
]

const CHANNELS = [
  { name: 'CodeWithHarry', handle: '@CodeWithHarry', verified: true, subs: 6_800_000, color: '#f59e0b' },
  { name: 'Fireship', handle: '@Fireship', verified: true, subs: 3_100_000, color: '#ef4444' },
  { name: 'Veritasium', handle: '@veritasium', verified: true, subs: 15_400_000, color: '#3b82f6' },
  { name: 'Marques Brownlee', handle: '@MKBHD', verified: true, subs: 19_200_000, color: '#22c55e' },
  { name: 'Kurzgesagt', handle: '@kurzgesagt', verified: true, subs: 22_900_000, color: '#06b6d4' },
  { name: 'ThePrimeagen', handle: '@ThePrimeagen', verified: true, subs: 512_000, color: '#a855f7' },
  { name: 'Nikhil Kamath', handle: '@nikhilkamath', verified: true, subs: 1_240_000, color: '#ec4899' },
  { name: 'MrBeast', handle: '@MrBeast', verified: true, subs: 340_000_000, color: '#16a34a' },
  { name: 'Nas Daily', handle: '@NasDaily', verified: true, subs: 5_600_000, color: '#eab308' },
  { name: 'Lofi Girl', handle: '@LofiGirl', verified: true, subs: 14_100_000, color: '#6366f1' },
  { name: 'Tech Burner', handle: '@TechBurner', verified: true, subs: 11_300_000, color: '#f97316' },
  { name: 'Ali Abdaal', handle: '@aliabdaal', verified: true, subs: 6_000_000, color: '#14b8a6' },
]

const TITLES = [
  'Build a Full Stack App in 4 Hours – Complete Tutorial',
  'This AI Tool Will Change How You Code Forever',
  'The Science of Why Time Feels Faster As You Age',
  'Reviewing the Most Hyped Phone of 2026',
  'The Universe Explained in 12 Minutes',
  'I Tried Vim for 30 Days. Here is What Happened',
  'How I Built a $10M Business From My Bedroom',
  'I Survived 100 Days in the Wild',
  'Why Nobody Is Talking About This Invention',
  'Lofi Beats to Code & Relax To – 24/7 Stream',
  'Every Budget Phone Under $200 Compared',
  'The Productivity System That Actually Works',
  'How to Learn Anything 10x Faster',
  'The Hidden Math Behind Every Great Design',
  'Cooking the Perfect Steak with Science',
  'A Day in the Life of a Software Engineer',
  'The Truth About Passive Income in 2026',
  'How Quantum Computers Actually Work',
  'Building the Ultimate Gaming Setup from Scratch',
  'Why This Tiny Island Has Its Own Internet',
  'The History of the Internet in 20 Minutes',
  'I Read 100 Books in a Year. Here is the Result',
  'Fixing My Broken Homelab (Finally)',
  'The Economics of Everything Being Free',
]

const CATEGORIES = ['All', 'Music', 'Gaming', 'Live', 'News', 'Mixes', 'Computer Science', 'Podcasts', 'Cooking', 'Technology', 'Science', 'Travel']

const CATEGORY_POOL = CATEGORIES.slice(1)

function seededInt(seed, min, max) {
  const x = Math.sin(seed * 9973.13) * 10000
  const frac = x - Math.floor(x)
  return Math.floor(frac * (max - min + 1)) + min
}

export function formatCount(n) {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1).replace('.0', '')}B`
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace('.0', '')}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace('.0', '')}K`
  return `${n}`
}

export const videos = TITLES.map((title, i) => {
  const channel = CHANNELS[i % CHANNELS.length]
  const source = VIDEO_SOURCES[i % VIDEO_SOURCES.length]
  const views = seededInt(i + 1, 12_000, 48_000_000)
  return {
    id: `v${i + 1}`,
    title,
    src: source,
    thumbnail: `https://picsum.photos/seed/yt${i + 21}/640/360`,
    duration: `${seededInt(i + 3, 1, 59)}:${String(seededInt(i + 7, 0, 59)).padStart(2, '0')}`,
    channel,
    views,
    likes: Math.floor(views * 0.03),
    uploaded: `${seededInt(i + 11, 1, 23)} ${['hours', 'days', 'weeks', 'months'][i % 4]} ago`,
    category: CATEGORY_POOL[i % CATEGORY_POOL.length],
    description:
      'In this video we dive deep into the topic and break it down into simple, actionable steps. If you enjoy this content, consider subscribing and hitting the bell so you never miss an upload.\n\nTimestamps:\n00:00 Intro\n01:24 Getting started\n04:10 The main idea\n09:42 Common mistakes\n14:05 Final thoughts\n\nLinks and resources mentioned are available in the description below.',
  }
})

export const categories = CATEGORIES

const SHORT_TITLES = [
  'This CSS trick blew my mind 🤯 #shorts',
  'POV: you finally fix the bug 🐛',
  '3 keyboard shortcuts you never use',
  'The fastest way to center a div',
  'When the deploy works on the first try',
  'One line of code you should know',
  'How AI is changing coding in 2026',
  'My honest setup tour in 30 seconds',
]

export const shorts = SHORT_TITLES.map((title, i) => {
  const channel = CHANNELS[(i + 2) % CHANNELS.length]
  const views = seededInt(i + 31, 50_000, 9_000_000)
  return {
    id: `s${i + 1}`,
    title,
    src: VIDEO_SOURCES[(i + 1) % VIDEO_SOURCES.length],
    thumbnail: `https://picsum.photos/seed/sh${i + 7}/480/854`,
    channel,
    views,
    likes: Math.floor(views * 0.08),
    comments: seededInt(i + 41, 12, 9_000),
  }
})

export const subscribedChannels = [
  'Fireship',
  'Veritasium',
  'Kurzgesagt',
  'Marques Brownlee',
  'Lofi Girl',
  'MrBeast',
]

export function getSubscribedVideos() {
  return videos.filter((v) => subscribedChannels.includes(v.channel.name))
}

export function getVideosByIds(ids) {
  const map = new Map(videos.map((v) => [v.id, v]))
  return ids.map((id) => map.get(id)).filter(Boolean)
}

export function getVideoById(id) {
  return videos.find((v) => v.id === id) ?? videos[0]
}

export function getRelatedVideos(video) {
  return videos
    .filter((v) => v.id !== video.id)
    .sort((a, b) => {
      const aMatch = a.category === video.category ? 1 : 0
      const bMatch = b.category === video.category ? 1 : 0
      return bMatch - aMatch
    })
    .slice(0, 12)
}

export function searchVideos(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return videos.filter(
    (v) =>
      v.title.toLowerCase().includes(q) ||
      v.channel.name.toLowerCase().includes(q) ||
      v.category.toLowerCase().includes(q),
  )
}

const COMMENT_AUTHORS = ['Aarav Sharma', 'Priya Patel', 'John Doe', 'Sara Kim', 'Dev Gupta', 'Alex Johnson', 'Mei Lin', 'Rahul Verma']
const COMMENT_TEXTS = [
  'This is exactly what I needed today. Thank you so much for the clear explanation!',
  'The editing on this channel is on another level. Instant subscribe.',
  'I have watched this three times already and I keep learning something new.',
  'Who else is watching this at 2am instead of sleeping?',
  'Finally someone who explains it without overcomplicating everything.',
  'The part at 09:42 completely changed how I think about this.',
  'Please make a follow up video, I have so many questions!',
  'Been following since 100k subs. The quality just keeps getting better.',
]

export function getComments(videoId) {
  const base = videoId ? videoId.charCodeAt(1) : 1
  const count = 6 + (base % 4)
  return Array.from({ length: count }, (_, i) => {
    const seed = (base + i) * 13
    const author = COMMENT_AUTHORS[seed % COMMENT_AUTHORS.length]
    return {
      id: `${videoId}-c${i}`,
      author,
      avatar: `https://picsum.photos/seed/av${seed}/80/80`,
      text: COMMENT_TEXTS[(seed + 3) % COMMENT_TEXTS.length],
      likes: seededInt(seed + 5, 3, 12_000),
      uploaded: `${seededInt(seed + 9, 1, 30)} days ago`,
    }
  })
}
