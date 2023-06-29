import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/components'
import { YearPage, MonthPage, WeekPage, DayPage } from './pages/pages'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<MonthPage />} />
        <Route path=':year' element={<YearPage />} />
        <Route path=':year/:month' element={<MonthPage />} />
        <Route path=':year/:month/:day' element={<DayPage />} />
        <Route path=':year/:month/week/:week' element={<WeekPage />} />
      </Route>
    </Routes>
  )
}

export default App
