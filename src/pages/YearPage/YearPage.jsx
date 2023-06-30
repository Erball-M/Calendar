import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { getYearMonths } from '../../utils/dateUtils'
import { usePathnameEffect, useMonthDays } from '../../hooks/hooks'
import { YearMonth } from '../../components/components'
import cl from './YearPage.module.scss'

const YearPage = () => {
  const params = useParams()

  usePathnameEffect(params)

  const months = useMonthDays()

  return (
    <div className={cl.wrapper}>
      <div className={cl.grid}>
        {months.map(month => (<YearMonth key={month.name} month={month} />))}
      </div>
    </div>
  )
}

export { YearPage }