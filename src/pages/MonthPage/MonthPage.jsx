import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import classNames from 'classnames'
import { usePathnameEffect, useMonthDays } from '../../hooks/hooks'
import { WeekDaysRow, MonthDay } from '../../components/components'
import cl from './MonthPage.module.scss'

const MonthPage = () => {
    const params = useParams()

    usePathnameEffect(params)

    // const month = useMonthDays()
    const year = useMonthDays()

    return (
        <>
            <WeekDaysRow />
            <div className={classNames(cl.grid, 'scrollContainer')}>
                {
                    year.map(month => (
                        <Fragment key={month.name}>
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