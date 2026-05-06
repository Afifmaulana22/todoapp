import React from 'react'
import { Category, FilterStatus } from '../types'

interface FilterBarProps {
  filter: FilterStatus
  setFilter: (f: FilterStatus) => void
  category: Category
  setCategory: (c: Category) => void
  search: string
  setSearch: (s: string) => void
}

const filters: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

const categories: { value: Category; label: string; emoji: string }[] = [
  { value: 'all', label: 'All', emoji: '🌐' },
  { value: 'personal', label: 'Personal', emoji: '👤' },
  { value: 'work', label: 'Work', emoji: '💼' },
  { value: 'shopping', label: 'Shopping', emoji: '🛒' },
  { value: 'health', label: 'Health', emoji: '💪' },
]

export default function FilterBar({ filter, setFilter, category, setCategory, search, setSearch }: FilterBarProps) {
  return (
    <div className="mb-5 space-y-3">
      {/* Search */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white/80 placeholder-white/25 text-sm outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors text-xs">✕</button>
        )}
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-1 bg-white/5 rounded-xl p-1">
        {filters.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-200
              ${filter === f.value
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/20'
                : 'text-white/40 hover:text-white/60'
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Category chips */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(c => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border
              ${category === c.value
                ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300'
                : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
              }`}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>
    </div>
  )
}
