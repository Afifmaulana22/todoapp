import React from 'react'
import { CheckCircle, Clock, Flame, LayoutList } from 'lucide-react'
import { Todo } from '../types'

interface StatsBarProps {
  todos: Todo[]
}

export default function StatsBar({ todos }: StatsBarProps) {
  const total = todos.length
  const completed = todos.filter(t => t.completed).length
  const active = todos.filter(t => !t.completed).length
  const high = todos.filter(t => t.priority === 'high' && !t.completed).length
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

  const stats = [
    { label: 'Total', value: total, icon: <LayoutList size={16} />, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: 'Active', value: active, icon: <Clock size={16} />, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Done', value: completed, icon: <CheckCircle size={16} />, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Urgent', value: high, icon: <Flame size={16} />, color: 'text-rose-400', bg: 'bg-rose-500/10' },
  ]

  return (
    <div className="mb-6">
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-white/50 font-medium uppercase tracking-wider">Overall Progress</span>
          <span className="text-xs font-bold text-indigo-400">{percent}%</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${percent}%`,
              background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)',
            }}
          />
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-3">
        {stats.map(s => (
          <div
            key={s.label}
            className={`glass rounded-xl p-3 flex flex-col items-center gap-1 ${s.bg}`}
          >
            <span className={`${s.color}`}>{s.icon}</span>
            <span className={`text-xl font-bold ${s.color}`}>{s.value}</span>
            <span className="text-xs text-white/40">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
