import React, { useState } from 'react'

const CHIP_OPTIONS = ['Vegan', 'Gluten‑Free', '≤$10', '≤1 mi', 'Tacos', 'Salads']

export default function Filter ({ onApply }) {
  const [selected, setSelected] = useState([])

  const toggle = label => {
    setSelected(prev => prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label])
  }

  return (
    <div className='flex flex-col items-center pt-10 space-y-8'>
      <h1 className='text-xl font-bold'>Filters</h1>

      <div className='grid grid-cols-3 gap-4'>
        {CHIP_OPTIONS.map(label => (
          <button
            key={label}
            onClick={() => toggle(label)}
            className={\`px-4 py-2 rounded-lg text-sm \${selected.includes(label) ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-800'}\`}
          >
            {label}
          </button>
        ))}
      </div>

      <button
        onClick={() => onApply(selected)}
        className='px-10 py-3 bg-indigo-600 text-white rounded-lg shadow'
      >
        Apply Filters
      </button>
    </div>
  )
}
