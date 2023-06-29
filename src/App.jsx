import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/components'
import { YearPage, MonthPage, WeekPage, DayPage } from './pages/pages'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<MonthPage />} />
        <Route path='year/:year' element={<YearPage />} />
        <Route path='month/:year/:month' element={<MonthPage />} />
        <Route path='year/:year/:month/:week' element={<WeekPage />} />
        <Route path='year/:year/:month/:day' element={<DayPage />} />
      </Route>
    </Routes>
  )
}

export default App
