import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/** helper to build an SVG arc path */
const polarToCartesian = (cx, cy, r, angleDeg) => {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}
const describeArc = (cx, cy, r, startDeg, endDeg) => {
  const start = polarToCartesian(cx, cy, r, endDeg)
  const end   = polarToCartesian(cx, cy, r, startDeg)
  const large = endDeg - startDeg <= 180 ? 0 : 1
  return [
    'M', start.x, start.y,
    'A', r, r, 0, large, 0, end.x, end.y,
    'L', cx, cy, 'Z'
  ].join(' ')
}

export default function Spinner ({ pool }) {
  const slice = 360 / pool.length
  const [spins, setSpins] = useState(0)      // cumulative rotation
  const [winner, setWinner] = useState(null) // picked restaurant

  const spin = () => {
    const pick = Math.floor(Math.random() * pool.length)       // which wedge wins
    const extraTurns = 5                                       // full 360° spins
    const endAngle =
      extraTurns * 360 +             // big spin
      (360 - (pick * slice + slice / 2)) // align winner to pointer (top)
    setSpins(spins + endAngle)
    setWinner(pool[pick])
  }

  /* simple star display */
  const Stars = ({ rating }) => {
    const full = Math.floor(rating)
    const half = rating % 1 >= 0.5
    return (
      <div className="flex">
        {[...Array(full)].map((_, i) => (
          <span key={i} className="text-yellow-400">★</span>
        ))}
        {half && <span className="text-yellow-400">☆</span>}
        {[...Array(5 - full - (half ? 1 : 0))].map((_, i) => (
          <span key={i} className="text-gray-300">★</span>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8 bg-gray-100">
      <h1 className="text-xl font-bold">Spin to Decide!</h1>

      {/* POINTER */}
      <div className="w-0 h-0 border-l-8 border-r-8 border-b-[18px] border-l-transparent border-r-transparent border-b-indigo-600" />

      {/* WHEEL */}
      <motion.div
        className="w-64 h-64"
        animate={{ rotate: spins }}
        transition={{ duration: 3, ease: 'easeOut' }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full rounded-full shadow">
          {pool.map((r, i) => {
            const start = i * slice
            const end   = start + slice
            const hue   = (i * 360) / pool.length
            return (
              <path
                key={r.id}
                d={describeArc(100, 100, 95, start, end)}
                fill={`hsl(${hue} 70% 60%)`}
                stroke="#fff"
                strokeWidth="1"
              />
            )
          })}
          {/* Optional labels inside wedges (small) */}
          {pool.map((r, i) => {
            const angle = (i + 0.5) * slice
            const { x, y } = polarToCartesian(100, 100, 60, angle)
            return (
              <text
                key={r.id + '-label'}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="7"
                fill="#000"
              >
                {r.name.split(' ')[0]} {/* first word to keep it short */}
              </text>
            )
          })}
        </svg>
      </motion.div>

      {/* Spin button */}
      <button
        onClick={spin}
        className="px-10 py-3 bg-indigo-600 text-white rounded-lg shadow"
      >
        Spin
      </button>

      {/* Result card */}
      <AnimatePresence>
        {winner && (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="w-80 p-4 bg-white rounded-xl shadow flex flex-col space-y-1"
          >
            <h2 className="text-lg font-semibold">{winner.name}</h2>
            <p className="text-sm text-gray-600">
              {winner.location.display_address.join(', ')}
            </p>
            <Stars rating={winner.rating} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
