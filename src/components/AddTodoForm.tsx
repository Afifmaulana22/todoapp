import React, { useState } from 'react'
import { Plus, ChevronDown } from 'lucide-react'
import { Priority, Category, Todo } from '../types'

interface AddTodoFormProps {
  onAdd: (todo: Omit<Todo, 'id' | 'createdAt'>) => void
}

const priorities: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'text-emerald-400' },
  { value: 'medium', label: 'Medium', color: 'text-amber-400' },
  { value: 'high', label: 'High', color: 'text-rose-400' },
]

const categories: { value: Exclude<Category, 'all'>; label: string; emoji: string }[] = [
  { value: 'personal', label: 'Personal', emoji: '👤' },
  { value: 'work', label: 'Work', emoji: '💼' },
  { value: 'shopping', label: 'Shopping', emoji: '🛒' },
  { value: 'health', label: 'Health', emoji: '💪' },
]

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [category, setCategory] = useState<Exclude<Category, 'all'>>('personal')
  const [dueDate, setDueDate] = useState('')
  const [expanded, setExpanded] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    onAdd({
      text: text.trim(),
      completed: false,
      priority,
      category,
      dueDate: dueDate || undefined,
    })
    setText('')
    setDueDate('')
    setExpanded(false)
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-4 mb-6">
      {/* Main input row */}
      <div className="flex gap-3 items-center">
        <div className="flex-1 relative">
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            onFocus={() => setExpanded(true)}
            placeholder="Add a new task..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none focus:border-indigo-500/60 focus:bg-indigo-500/5 transition-all duration-200"
          />
        </div>
        <button
          type="submit"
          disabled={!text.trim()}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-5 py-3 rounded-xl text-sm transition-all duration-200 active:scale-95 shadow-lg shadow-indigo-500/20"
        >
          <Plus size={16} />
          <span>Add</span>
        </button>
      </div>

      {/* Expanded options */}
      {expanded && (
        <div className="mt-3 pt-3 border-t border-white/5">
          <div className="flex flex-wrap gap-3">
            {/* Priority */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-white/40 uppercase tracking-wider">Priority</label>
              <div className="flex gap-2">
                {priorities.map(p => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setPriority(p.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 border
                      ${priority === p.value
                        ? `${p.color} border-current bg-white/10`
                        : 'text-white/40 border-white/10 hover:border-white/20'
                      }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-white/40 uppercase tracking-wider">Category</label>
              <div className="flex gap-2">
                {categories.map(c => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setCategory(c.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 border
                      ${category === c.value
                        ? 'text-indigo-300 border-indigo-500/60 bg-indigo-500/10'
                        : 'text-white/40 border-white/10 hover:border-white/20'
                      }`}
                  >
                    {c.emoji} {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Due Date */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-white/40 uppercase tracking-wider">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white/70 text-xs outline-none focus:border-indigo-500/50 transition-all duration-200 [color-scheme:dark]"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="mt-3 text-xs text-white/30 hover:text-white/50 transition-colors flex items-center gap-1"
          >
            <ChevronDown size={12} className="rotate-180" /> Collapse
          </button>
        </div>
      )}
    </form>
  )
}
