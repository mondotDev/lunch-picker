import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Triage from './components/Triage'
import Filter from './components/Filter'
import Spinner from './components/Spinner'
import fakeData from './data/fakeRestaurants'

function App () {
  const navigate = useNavigate()
  const [mode, setMode] = useState(null) // delivery or pickup
  const [filters, setFilters] = useState([])
  const [pool, setPool] = useState(fakeData.businesses)

  return (
    <Routes>
      <Route index element={<Triage onSelect={m => { setMode(m); navigate('/filter') }} />} />
      <Route path='filter' element={<Filter onApply={f => { setFilters(f); navigate('/spinner') }} />} />
      <Route path='spinner' element={<Spinner pool={pool} />} />
    </Routes>
  )
}

export default App
