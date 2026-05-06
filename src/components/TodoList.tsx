import React from 'react'
import { ClipboardList } from 'lucide-react'
import TodoItem from './TodoItem'
import { Todo } from '../types'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

export default function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
          <ClipboardList size={28} className="text-indigo-400/60" />
        </div>
        <p className="text-white/40 text-sm font-medium">No tasks here</p>
        <p className="text-white/20 text-xs mt-1">Add a task above to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-2.5">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}
