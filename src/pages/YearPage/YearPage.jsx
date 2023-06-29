import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { getYearMonths } from '../../utils/yearUtils'
import cl from './YearPage.module.scss'
import { YearMonth } from '../../components/components'

const YearPage = () => {
  const { year } = useParams()
  const months = useMemo(() => {
    return (getYearMonths(year))
  }, [year])

  return (
    <div className={cl.wrapper}>
      <div className={cl.grid}>
        {months.map(month => (<YearMonth key={month.name} month={month} />))}
      </div>
    </div>
  )
}

export { YearPage }