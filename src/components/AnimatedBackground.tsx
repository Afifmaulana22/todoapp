import React from 'react'

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Dark base */}
      <div className="absolute inset-0 bg-[#0a0a1a]" />

      {/* Animated blobs */}
      <div
        className="animate-blob animation-delay-0 absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }}
      />
      <div
        className="animate-blob animation-delay-2000 absolute top-1/3 -right-32 w-80 h-80 rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }}
      />
      <div
        className="animate-blob animation-delay-4000 absolute -bottom-32 left-1/3 w-72 h-72 rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)' }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}
