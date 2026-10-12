export default function ChipBar({ items, active, onSelect }) {
  return (
    <div className="no-scrollbar sticky top-14 z-20 flex gap-3 overflow-x-auto bg-white/95 px-4 py-3 backdrop-blur dark:bg-[#0f0f0f]/95">
      {items.map((item) => {
        const isActive = item === active
        return (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors ${
              isActive
                ? 'bg-[#0f0f0f] text-white dark:bg-[#f1f1f1] dark:text-[#0f0f0f]'
                : 'bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20'
            }`}
          >
            {item}
          </button>
        )
      })}
    </div>
  )
}
