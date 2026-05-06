import React from 'react'
import { ArrowUpDown, Trash } from 'lucide-react'

export type SortOption = 'newest' | 'oldest' | 'priority' | 'alpha'

interface SortBarProps {
  sort: SortOption
  setSort: (s: SortOption) => void
  completedCount: number
  onClearCompleted: () => void
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'priority', label: 'Priority' },
  { value: 'alpha', label: 'A–Z' },
]

export default function SortBar({ sort, setSort, completedCount, onClearCompleted }: SortBarProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <ArrowUpDown size={13} className="text-white/30" />
        <div className="flex gap-1">
          {sortOptions.map(s => (
            <button
              key={s.value}
              onClick={() => setSort(s.value)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150
                ${sort === s.value
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                  : 'text-white/35 hover:text-white/55 border border-transparent'
                }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="flex items-center gap-1.5 text-xs text-white/25 hover:text-rose-400 transition-colors duration-150"
        >
          <Trash size={11} />
          Clear {completedCount} done
        </button>
      )}
    </div>
  )
}
