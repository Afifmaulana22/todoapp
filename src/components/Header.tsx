import React from 'react'
import { CheckSquare, Sparkles } from 'lucide-react'

export default function Header() {
  const now = new Date()
  const hours = now.getHours()
  const greeting =
    hours < 12 ? 'Good Morning' : hours < 17 ? 'Good Afternoon' : 'Good Evening'

  return (
    <div className="mb-8 text-center">
      {/* Logo */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <CheckSquare size={24} className="text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
            <Sparkles size={8} className="text-white" />
          </div>
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-black gradient-text tracking-tight">TaskFlow</h1>
          <p className="text-xs text-white/30 -mt-0.5">Stay organized, stay ahead</p>
        </div>
      </div>

      {/* Greeting */}
      <p className="text-white/40 text-sm">{greeting}! What will you accomplish today?</p>
    </div>
  )
}
