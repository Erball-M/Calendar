import React from 'react'
import classNames from 'classnames'
import { useMonthDays, usePathnameEffect } from '../../hooks/hooks'
import { YearMonth } from '../../components/components'
import cl from './YearPage.module.scss'

const YearPage = () => {
  usePathnameEffect()

  const months = useMonthDays()

  return (
    <div className={cl.wrapper}>
      <div className={classNames(cl.grid, 'scrollContainer')}>
        {months.map(month => (<YearMonth key={month.caption} month={month} />))}
      </div>
    </div>
  )
}

export { YearPage }