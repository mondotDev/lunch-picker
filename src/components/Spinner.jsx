import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function Spinner ({ pool }) {
  const [picked, setPicked] = useState(null)

  const spin = () => {
    const random = pool[Math.floor(Math.random() * pool.length)]
    setPicked(random)
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen space-y-6 bg-gray-100'>
      <h1 className='text-xl font-bold mb-4'>Spin to Decide!</h1>

      <motion.div
        className='w-48 h-48 rounded-full bg-white border border-gray-300 flex items-center justify-center'
        animate={{ rotate: picked ? 720 : 0 }}
        transition={{ duration: 1 }}
      >
        {picked ? (
          <span className='text-center px-4'>{picked.name}</span>
        ) : (
          <span className='text-gray-400'>?</span>
        )}
      </motion.div>

      <button
        onClick={spin}
        className='px-10 py-3 bg-indigo-600 text-white rounded-lg shadow'
      >
        Spin
      </button>
    </div>
  )
}
