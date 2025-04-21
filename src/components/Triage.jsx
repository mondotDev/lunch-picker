import React from 'react'

export default function Triage ({ onSelect }) {
  return (
    <div className='flex flex-col items-center justify-center h-screen space-y-6 bg-gray-100'>
      <h1 className='text-2xl font-bold'>How do you want lunch?</h1>
      <button
        onClick={() => onSelect('delivery')}
        className='px-8 py-4 bg-indigo-600 text-white rounded-lg shadow'
      >
        Delivery
      </button>
      <button
        onClick={() => onSelect('pickup')}
        className='px-8 py-4 bg-indigo-600 text-white rounded-lg shadow'
      >
        Pickup
      </button>
    </div>
  )
}
