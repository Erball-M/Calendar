import React, { Fragment, useEffect, useState } from 'react'
import classNames from 'classnames'
import { getMonthDaysWithIndent } from '../../utils/dateUtils'
import { useMonthDays, usePathnameEffect } from '../../hooks/hooks'
import { WeekDaysRow, MonthDay } from '../../components/components'
import cl from './MonthPage.module.scss'

const MonthPage = () => {
    usePathnameEffect()

    const months = useMonthDays()

    const firstMonthWithIndent = getMonthDaysWithIndent(months[0])
    months.splice(0, 1, firstMonthWithIndent)

    return (
        <>
            <WeekDaysRow />
            <div className={classNames(cl.grid, 'scrollContainer')}>
                {
                    months.map(month => (
                        <Fragment key={month.id}>
                            {month.days.map(day => (<MonthDay key={day.id} day={day} />))}
                        </Fragment>
                    ))
                }
            </div >
        </>
    )
}

export { MonthPage }