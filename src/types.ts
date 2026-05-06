export type Priority = 'low' | 'medium' | 'high'
export type Category = 'all' | 'personal' | 'work' | 'shopping' | 'health'
export type FilterStatus = 'all' | 'active' | 'completed'

export interface Todo {
  id: string
  text: string
  completed: boolean
  priority: Priority
  category: Exclude<Category, 'all'>
  createdAt: Date
  dueDate?: string
}
