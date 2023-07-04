import React, { Fragment, useEffect, useState } from 'react'
import classNames from 'classnames'
import { useMonthDays, usePathnameEffect, useScrollNavigate } from '../../hooks/hooks'
import { WeekDaysRow, MonthDay } from '../../components/components'
import cl from './MonthPage.module.scss'

const MonthPage = () => {
    usePathnameEffect()

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
            </div >
        </>
    )
}

export { MonthPage }