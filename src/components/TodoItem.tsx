import React, { useState } from 'react'
import { Trash2, Calendar, Flag, Pencil, Check, X } from 'lucide-react'
import { Todo, Priority } from '../types'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

const priorityConfig: Record<Priority, { color: string; bg: string; dot: string; label: string }> = {
  high: { color: 'text-rose-400', bg: 'bg-rose-500/10', dot: 'bg-rose-400', label: 'High' },
  medium: { color: 'text-amber-400', bg: 'bg-amber-500/10', dot: 'bg-amber-400', label: 'Med' },
  low: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', dot: 'bg-emerald-400', label: 'Low' },
}

const categoryEmoji: Record<string, string> = {
  personal: '👤',
  work: '💼',
  shopping: '🛒',
  health: '💪',
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = Math.ceil((date.getTime() - now.setHours(0,0,0,0)) / (1000 * 60 * 60 * 24))
  if (diff < 0) return `${Math.abs(diff)}d overdue`
  if (diff === 0) return 'Due today'
  if (diff === 1) return 'Due tomorrow'
  return `${diff}d left`
}

function isOverdue(dateStr: string): boolean {
  const date = new Date(dateStr)
  const now = new Date()
  now.setHours(0,0,0,0)
  return date < now
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const pConfig = priorityConfig[todo.priority]

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim())
    }
    setEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') { setEditText(todo.text); setEditing(false) }
  }

  const overdue = todo.dueDate && !todo.completed && isOverdue(todo.dueDate)

  return (
    <div
      className={`todo-card group glass rounded-xl p-4 border transition-all duration-200
        ${todo.completed
          ? 'border-white/5 opacity-60'
          : overdue
            ? 'border-rose-500/30 hover:border-rose-500/50'
            : 'border-white/5 hover:border-indigo-500/30'
        }`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200
            ${todo.completed
              ? 'bg-gradient-to-br from-indigo-500 to-purple-500 border-transparent'
              : 'border-white/20 hover:border-indigo-400/60 hover:bg-indigo-500/10'
            }`}
        >
          {todo.completed && <Check size={11} className="text-white" strokeWidth={3} />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {editing ? (
            <div className="flex gap-2">
              <input
                autoFocus
                value={editText}
                onChange={e => setEditText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-white/5 border border-indigo-500/50 rounded-lg px-3 py-1 text-white text-sm outline-none"
              />
              <button onClick={handleSave} className="text-emerald-400 hover:text-emerald-300 p-1">
                <Check size={14} />
              </button>
              <button onClick={() => { setEditText(todo.text); setEditing(false) }} className="text-rose-400 hover:text-rose-300 p-1">
                <X size={14} />
              </button>
            </div>
          ) : (
            <p className={`text-sm leading-relaxed transition-all duration-300 ${
              todo.completed ? 'line-through text-white/30' : 'text-white/85'
            }`}>
              {todo.text}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {/* Category */}
            <span className="text-xs text-white/35">
              {categoryEmoji[todo.category]} {todo.category}
            </span>

            {/* Priority badge */}
            <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${pConfig.bg} ${pConfig.color}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${pConfig.dot}`} />
              {pConfig.label}
            </span>

            {/* Due date */}
            {todo.dueDate && (
              <span className={`inline-flex items-center gap-1 text-xs ${
                overdue ? 'text-rose-400' : 'text-white/35'
              }`}>
                <Calendar size={10} />
                {formatDate(todo.dueDate)}
              </span>
            )}
          </div>
        </div>

        {/* Actions (visible on hover) */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          {!todo.completed && (
            <button
              onClick={() => setEditing(true)}
              className="p-1.5 rounded-lg text-white/30 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all duration-150"
            >
              <Pencil size={13} />
            </button>
          )}
          <button
            onClick={() => onDelete(todo.id)}
            className="p-1.5 rounded-lg text-white/30 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-150"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}
