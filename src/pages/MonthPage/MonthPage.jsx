import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import classNames from 'classnames'
import { addIndentToYear, getMonthDaysWithIndent, getNeighborParams, getYearMonths } from '../../utils/dateUtils'
import { useMonthDays, usePathnameEffect } from '../../hooks/hooks'
import { WeekDaysRow, MonthDay } from '../../components/components'
import cl from './MonthPage.module.scss'

const MonthPage = () => {
    const { year } = useParams()
    usePathnameEffect()

    const [months, setMonths] = useState(getYearMonths({ year }))

    // const months = useMonthDays(true)

    useEffect(() => {
        const currentYearMonths = getYearMonths({ year })

        const prevYearParams = getNeighborParams({ year }, false)
        const prevYearMonths = getYearMonths(prevYearParams)

        const nextYearParams = getNeighborParams({ year }, true)
        const nextYearMonths = getYearMonths(nextYearParams)

        const advancedMonths = addIndentToYear([...currentYearMonths, ...nextYearMonths])
        // ...prevYearMonths,

        setMonths(advancedMonths)
    }, [year])
    // const yearsWithIndent = addIndentToYear(months)

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