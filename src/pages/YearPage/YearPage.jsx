import React, { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getYearMonths } from '../../utils/yearUtils'
import cl from './YearPage.module.scss'
import { YearMonth } from '../../components/components'

const YearPage = () => {
  const params = useParams()
  const navigate = useNavigate()

  const year = parseInt(params.year)
  useEffect(() => {
    if (isNaN(year) || year < 1960) {
      navigate('/1960')
    }
  }, [year])

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