import React, { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { checkDateInRange, getYearMonths } from '../../utils/dateUtils'
import { YearMonth } from '../../components/components'
import cl from './YearPage.module.scss'
import { usePathnameEffect } from '../../hooks/usePathnameEffect'

const YearPage = () => {
  const params = useParams()

  usePathnameEffect(params)

  const months = useMemo(() => getYearMonths(params.year), [params.year])

  return (
    <div className={cl.wrapper}>
      <div className={cl.grid}>
        {months.map(month => (<YearMonth key={month.name} month={month} />))}
      </div>
    </div>
  )
}

export { YearPage }