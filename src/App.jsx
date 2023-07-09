import React, { useEffect, useMemo } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { idbOpen } from './store/slices/dataSlice'
import { usePopupPanel } from './hooks/hooks'
import { getYearMonths } from './utils/dateUtils'
import { CalendarLayout, PopupPanel } from './components/components'
import { YearPage, MonthPage, WeekPage, DayPage } from './pages/pages'

function App() {
  const dispatch = useDispatch()
  const idbLoading = useSelector(state => state.data.idbLoading)
  const storeMonths = useSelector(state => state.data.months)

  useEffect(() => {
    document.body.setAttribute('data-theme', 'light')
    dispatch(idbOpen())
  }, [])

  const { isOpen, triggeredNode, cursor, toggler, handler } = usePopupPanel('[data-date]')

  return (
    <>
      {/* <button onClick={toggler}>toggle</button> */}
      <Routes>
        <Route path='/' element={<CalendarLayout togglePanel={handler} />} >
          <Route path=':year' element={<YearPage />} />
          <Route path=':year/:month' element={<MonthPage />} />
          <Route path=':year/:month/:day' element={<DayPage />} />
          <Route path=':year/:month/:day/:week' element={<WeekPage />} />
        </Route>
        <Route path='/add' element={<div>add notice page</div>} />
      </Routes>
      <PopupPanel
        isOpen={isOpen}
        toggler={toggler}
        triggeredNode={triggeredNode}
        cursor={cursor}
      />
    </>
  )
}

export default App
