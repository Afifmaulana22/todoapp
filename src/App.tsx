import React, { useState, useEffect, useMemo } from 'react'
import AnimatedBackground from './components/AnimatedBackground'
import Header from './components/Header'
import StatsBar from './components/StatsBar'
import AddTodoForm from './components/AddTodoForm'
import FilterBar from './components/FilterBar'
import SortBar, { SortOption } from './components/SortBar'
import TodoList from './components/TodoList'
import { Todo, Priority, Category, FilterStatus } from './types'

const STORAGE_KEY = 'taskflow-todos'

const priorityOrder: Record<Priority, number> = { high: 0, medium: 1, low: 2 }

function generateId(): string {
  return Math.random().toString(36).substring(2, 10)
}

const defaultTodos: Todo[] = [
  {
    id: generateId(),
    text: 'Review project proposal and give feedback',
    completed: false,
    priority: 'high',
    category: 'work',
    createdAt: new Date(),
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
  },
  {
    id: generateId(),
    text: 'Buy groceries — milk, eggs, bread, fruits',
    completed: false,
    priority: 'medium',
    category: 'shopping',
    createdAt: new Date(),
  },
  {
    id: generateId(),
    text: '30-minute morning run',
    completed: true,
    priority: 'medium',
    category: 'health',
    createdAt: new Date(),
  },
  {
    id: generateId(),
    text: 'Call mom for her birthday 🎂',
    completed: false,
    priority: 'high',
    category: 'personal',
    createdAt: new Date(),
    dueDate: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
  },
  {
    id: generateId(),
    text: 'Read 20 pages of current book',
    completed: false,
    priority: 'low',
    category: 'personal',
    createdAt: new Date(),
  },
]

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        return parsed.map((t: any) => ({ ...t, createdAt: new Date(t.createdAt) }))
      }
    } catch {}
    return defaultTodos
  })

  const [filter, setFilter] = useState<FilterStatus>('all')
  const [category, setCategory] = useState<Category>('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortOption>('newest')

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  // CRUD
  const addTodo = (data: Omit<Todo, 'id' | 'createdAt'>) => {
    setTodos(prev => [{ ...data, id: generateId(), createdAt: new Date() }, ...prev])
  }

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  const editTodo = (id: string, text: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, text } : t))
  }

  const clearCompleted = () => {
    setTodos(prev => prev.filter(t => !t.completed))
  }

  // Filter + sort
  const filteredTodos = useMemo(() => {
    let result = todos

    // Status filter
    if (filter === 'active') result = result.filter(t => !t.completed)
    else if (filter === 'completed') result = result.filter(t => t.completed)

    // Category filter
    if (category !== 'all') result = result.filter(t => t.category === category)

    // Search
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(t => t.text.toLowerCase().includes(q))
    }

    // Sort
    result = [...result].sort((a, b) => {
      switch (sort) {
        case 'newest': return b.createdAt.getTime() - a.createdAt.getTime()
        case 'oldest': return a.createdAt.getTime() - b.createdAt.getTime()
        case 'priority': return priorityOrder[a.priority] - priorityOrder[b.priority]
        case 'alpha': return a.text.localeCompare(b.text)
        default: return 0
      }
    })

    return result
  }, [todos, filter, category, search, sort])

  const completedCount = todos.filter(t => t.completed).length

  return (
    <div className="min-h-screen text-white">
      <AnimatedBackground />

      <div className="max-w-xl mx-auto px-4 py-10">
        {/* Header */}
        <Header />

        {/* Stats */}
        <StatsBar todos={todos} />

        {/* Add Todo */}
        <AddTodoForm onAdd={addTodo} />

        {/* Filters */}
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          category={category}
          setCategory={setCategory}
          search={search}
          setSearch={setSearch}
        />

        {/* Sort + Clear */}
        <SortBar
          sort={sort}
          setSort={setSort}
          completedCount={completedCount}
          onClearCompleted={clearCompleted}
        />

        {/* Todo List */}
        <div className="scrollbar-thin overflow-y-auto max-h-[520px] pr-1">
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-white/20">
          TaskFlow • {todos.length} task{todos.length !== 1 ? 's' : ''} total
        </div>
      </div>
    </div>
  )
}
