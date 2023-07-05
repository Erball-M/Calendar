import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { getDefaultPathname } from './utils/dateUtils'
import { Layout } from './components/components'
import { YearPage, MonthPage, WeekPage, DayPage } from './pages/pages'

function App() {
  useEffect(() => document.body.setAttribute('data-theme', 'light'), [])

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Navigate to={getDefaultPathname()} />} />
        <Route path=':year' element={<YearPage />} />
        <Route path=':year/:month' element={<MonthPage />} />
        <Route path=':year/:month/:day' element={<DayPage />} />
        <Route path=':year/:month/:day/:week' element={<WeekPage />} />
      </Route>
    </Routes>
  )
}

export default App
