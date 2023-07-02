import React, { Fragment } from 'react'
import classNames from 'classnames'
import { useMonthDays, usePathnameEffect } from '../../hooks/hooks'
import { WeekDaysRow, MonthDay } from '../../components/components'
import cl from './MonthPage.module.scss'

const MonthPage = () => {
    usePathnameEffect()

    // const month = useMonthDays()
    const year = useMonthDays()

    return (
        <>
            <WeekDaysRow />
            <div className={classNames(cl.grid, 'scrollContainer')}>
                {
                    year.map(month => (
                        <Fragment key={month.caption}>
                            {month.days.map(day => (<MonthDay key={day.id} day={day} />))}
                        </Fragment>
                    ))
                }
                {/* {month.days.map(day => (<MonthDay key={day.id} day={day} />))} */}
            </div >
        </>
    )
}

export { MonthPage }