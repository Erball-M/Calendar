import React, { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getYearMonths, checkYearInRange } from '../../utils/yearUtils'
import { YearMonth } from '../../components/components'
import cl from './YearPage.module.scss'

const YearPage = () => {
  const params = useParams()
  const navigate = useNavigate()

  const year = parseInt(params.year)
  useEffect(() => {
    const isInRange = checkYearInRange(year)
    if (isInRange) {
      navigate(isInRange)
    }
  }, [year])

  const months = useMemo(() => getYearMonths(year), [year])

  return (
    <div className={cl.wrapper}>
      <div className={cl.grid}>
        {months.map(month => (<YearMonth key={month.name} month={month} />))}
      </div>
    </div>
  )
}

export { YearPage }