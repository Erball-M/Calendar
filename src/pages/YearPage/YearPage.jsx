import React from 'react'
import classNames from 'classnames'
import { useMonthDays } from '../../hooks/hooks'
import { YearMonth } from '../../components/components'
import cl from './YearPage.module.scss'
import { useOutletContext } from 'react-router-dom'

const YearPage = () => {
  // const months = useMonthDays()

  const months = useOutletContext()

  return (
    <>
      <div />{/* hack, TO CHANGE */}
      <div className={cl.wrapper}>
        <div className={classNames(cl.grid, 'scrollContainer')}>
          {months.map(month => (<YearMonth key={month.caption} month={month} />))}
        </div>
      </div>
    </>
  )
}

export { YearPage }