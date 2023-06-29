import React, { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { checkDateInRange, getYearMonths } from '../../utils/dateUtils'
import { YearMonth } from '../../components/components'
import cl from './YearPage.module.scss'

const YearPage = () => {
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const isInRange = checkDateInRange(params)
    // if (isInRange) {
    //   navigate(isInRange)
    // }
    console.log(isInRange, 'isInRangeYearPage')
  }, [params])

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